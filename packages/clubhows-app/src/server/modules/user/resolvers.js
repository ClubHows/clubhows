/*eslint-disable no-unused-vars*/
import { pick } from 'lodash';
import jwt from 'jsonwebtoken';
import withAuth from 'graphql-auth';
import { refreshTokens, tryLogin } from './auth';
import FieldError from '../../../common/FieldError';
import settings from '../../../../settings';

import log from '../../../common/log';

export default pubsub => ({
  Query: {
    users: withAuth(['user:view:all'], (obj, { orderBy, filter }, context) => {
      return context.User.getUsers(orderBy, filter);
    }),
    user: withAuth(
      (obj, args, context) => {
        return context.user._id !== args._id ? ['user:view'] : ['user:view:self'];
      },
      (obj, { _id }, context) => {
        return context.User.getUser(_id);
      }
    ),
    currentUser(obj, args, context) {
      if (context.user) {
        return context.User.getUser(context.user._id);
      } else {
        return null;
      }
    }
  },
  User: {
    profile(obj) {
      return obj;
    },
    facebook(obj) {
      return obj;
    }
  },
  UserProfile: {
    firstName(obj) {
      return obj.firstName;
    },
    lastName(obj) {
      return obj.lastName;
    },
    fullName(obj) {
      if (obj.firstName && obj.lastName) {
        return `${obj.firstName} ${obj.lastName}`;
      } else {
        return null;
      }
    }
  },
  FacebookProfile: {
    fbId(obj) {
      return obj.fbId;
    },
    displayName(obj) {
      return obj.displayName;
    },
    accessToken(obj) {
      return obj.accessToken;
    },
    expiresAt(obj) {
      return obj.expiresAt;
    },
    email(obj) {
      return obj.email;
    },
    firstName(obj) {
      return obj.firstName;
    },
    lastName(obj) {
      return obj.lastName;
    },
    link(obj) {
      return obj.link;
    },
    gender(obj) {
      return obj.gender;
    },
    locale(obj) {
      return obj.locale;
    }
  },
  Mutation: {
    async register(obj, { input }, context) {
      log('78', input);
      try {
        const e = new FieldError();

        const userExists = await context.User.getUserByUsername(input.username);
        if (userExists) {
          e.setError('username', 'Username already exists.');
        }

        const emailExists = await context.User.getUserByEmail(input.email);
        if (emailExists) {
          e.setError('email', 'E-mail already exists.');
        }

        e.throwIf();

        let _id = 0;
        let userAdded;
        if (!emailExists) {
          let isActive = false;
          if (!settings.user.auth.password.confirm) {
            isActive = true;
          }

          userAdded = await context.User.addUser({ ...input, isActive });
          // if user has previously logged with facebook auth
        } else {
          await context.User.updatePassword(emailExists._id, input.password);
          _id = emailExists.userId;
        }
        log('119', userAdded);

        if (context.mailer && settings.user.auth.password.sendConfirmationEmail && !emailExists && context.req) {
          // async email
          await jwt.sign({ user: pick(userAdded, '_id') }, context.SECRET, { expiresIn: '1d' }, (err, emailToken) => {
            log('125', emailToken, err);
            const encodedToken = Buffer.from(emailToken).toString('base64');
            const url = `${context.req.protocol}://${context.req.get('host')}/confirmation/${encodedToken}`;
            log('128', encodedToken, url);
            context.mailer.sendMail({
              from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
              to: userAdded.email,
              subject: 'Confirm Email',
              html: `<p>Hi, ${userAdded.username}!</p>
              <p>Welcome to ${settings.app.name}. Please click the following link to confirm your email:</p>
              <p><a href="${url}">${url}</a></p>
              <p>Below is your login information</p>
              <p>Your email is: ${userAdded.email}</p>
              <p>Your password is: ${input.password}</p>`
            });
            log('register email sent');
          });
        }
        return { userAdded };
      } catch (e) {
        return { errors: e };
      }
    },
    async login(obj, { input: { email, password } }, context) {
      try {
        const tokens = await tryLogin(email, password, context.User, context.SECRET);
        if (context.req) {
          context.req.universalCookies.set('x-token', tokens.token, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true
          });
          context.req.universalCookies.set('x-refresh-token', tokens.refreshToken, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true
          });

          context.req.universalCookies.set('r-token', tokens.token, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: false
          });
          context.req.universalCookies.set('r-refresh-token', tokens.refreshToken, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: false
          });
        }
        return { tokens };
      } catch (e) {
        return { errors: e };
      }
    },
    async logout(obj, args, context) {
      if (context.req) {
        context.req.universalCookies.remove('x-token');
        context.req.universalCookies.remove('x-refresh-token');

        context.req.universalCookies.remove('r-token');
        context.req.universalCookies.remove('r-refresh-token');
      }

      return true;
    },
    refreshTokens(obj, { token, refreshToken }, context) {
      return refreshTokens(token, refreshToken, context.User, context.SECRET);
    },
    addUser: withAuth(
      (obj, args, context) => {
        return context.user._id !== args._id ? ['user:create'] : ['user:create:self'];
      },
      async (obj, { input }, context) => {
        try {
          const e = new FieldError();

          const userExists = await context.User.getUserByUsername(input.username);
          if (userExists) {
            e.setError('username', 'Username already exists.');
          }

          const emailExists = await context.User.getUserByEmail(input.email);
          if (emailExists) {
            e.setError('email', 'E-mail already exists.');
          }

          if (input.password.length < 5) {
            e.setError('password', `Password must be 5 characters or more.`);
          }

          e.throwIf();

          const [createdUserId] = await context.User.addUser({ ...input });
          await context.User.editUser({ id: createdUserId, ...input });

          if (settings.user.auth.certificate.enabled) {
            await context.User.editAuthCertificate({ id: createdUserId, ...input });
          }

          const user = await context.User.getUser(createdUserId);

          if (context.mailer && settings.user.auth.password.sendAddNewUserEmail && !emailExists && context.req) {
            // async email
            jwt.sign({ user: pick(user, 'id') }, context.SECRET, { expiresIn: '1d' }, (err, emailToken) => {
              const encodedToken = Buffer.from(emailToken).toString('base64');
              const url = `${context.req.protocol}://${context.req.get('host')}/confirmation/${encodedToken}`;
              context.mailer.sendMail({
                from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: 'Your account has been created',
                html: `<p>Hi, ${user.username}!</p>
                <p>Welcome to ${settings.app.name}. Please click the following link to confirm your email:</p>
                <p><a href="${url}">${url}</a></p>
                <p>Below are your login information</p>
                <p>Your email is: ${user.email}</p>
                <p>Your password is: ${input.password}</p>`
              });
            });
          }

          return { user };
        } catch (e) {
          return { errors: e };
        }
      }
    ),
    editUser: withAuth(
      (obj, args, context) => {
        return context.user._id !== args._id ? ['user:update'] : ['user:update:self'];
      },
      async (obj, { input }, context) => {
        try {
          const e = new FieldError();
          const userExists = await context.User.getUserByUsername(input.username);
          if (userExists && userExists._id !== input.id) {
            e.setError('username', 'Username already exists.');
          }

          const emailExists = await context.User.getUserByEmail(input.email);
          if (emailExists && emailExists._id !== input.id) {
            e.setError('email', 'E-mail already exists.');
          }

          if (input.password && input.password.length < 5) {
            e.setError('password', `Password must be 5 characters or more.`);
          }

          e.throwIf();

          await context.User.editUser(input);
          await context.User.editUserProfile(input);

          if (settings.user.auth.certificate.enabled) {
            await context.User.editAuthCertificate(input);
          }

          const user = await context.User.getUser(input.id);

          return { user };
        } catch (e) {
          return { errors: e };
        }
      }
    ),
    deleteUser: withAuth(
      (obj, args, context) => {
        return context.user._id !== args._id ? ['user:delete'] : ['user:delete:self'];
      },
      async (obj, { _id }, context) => {
        try {
          const e = new FieldError();
          const user = await context.User.getUser(_id);
          if (!user) {
            e.setError('delete', 'User does not exist.');
            e.throwIf();
          }

          if (user.id === context.user.id) {
            e.setError('delete', 'You can not delete your self.');
            e.throwIf();
          }

          const isDeleted = await context.User.deleteUser(_id);
          if (isDeleted) {
            return { user };
          } else {
            e.setError('delete', 'Could not delete user. Please try again later.');
            e.throwIf();
          }
        } catch (e) {
          return { errors: e };
        }
      }
    ),
    async forgotPassword(obj, { input }, context) {
      try {
        const localAuth = pick(input, 'email');
        const user = await context.User.getUserByEmail(localAuth.email);

        if (user && context.mailer) {
          // async email
          jwt.sign(
            { email: user.email, password: user.password },
            context.SECRET,
            { expiresIn: '1d' },
            (err, emailToken) => {
              // encoded token since react router does not match dots in params
              const encodedToken = Buffer.from(emailToken).toString('base64');
              const url = `${context.req.protocol}://${context.req.get('host')}/reset-password/${encodedToken}`;
              context.mailer.sendMail({
                from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: 'Reset Password',
                html: `Please click this link to reset your password: <a href="${url}">${url}</a>`
              });
            }
          );
        }
        return true;
      } catch (e) {
        // always return true so you can't discover users this way
        return true;
      }
    },
    async resetPassword(obj, { input }, context) {
      try {
        const e = new FieldError();
        const reset = pick(input, ['password', 'passwordConfirmation', 'token']);
        if (reset.password !== reset.passwordConfirmation) {
          e.setError('password', 'Passwords do not match.');
        }

        if (reset.password.length < 5) {
          e.setError('password', `Password must be 5 characters or more.`);
        }
        e.throwIf();

        const token = Buffer.from(reset.token, 'base64').toString();
        jwt.verify(token, context.SECRET, async (err, decoded) => {
          if (!err) {
            log('user_resolver 359: ', err, decoded);
            const { email, password } = decoded;
            log('user_resolver 361: ', email, password);
            const user = await context.User.getUserByEmail(email);
            log('user_resolver 364: ', user._id, reset.password);
            if (user.password !== password) {
              e.setError('token', 'Invalid token');
              e.throwIf();
            }

            return await context.User.updatePassword(user._id, reset.password);
          }
          e.setError('token', err.message);
          e.throw();
        });
        return { errors: null };
      } catch (e) {
        return { errors: e };
      }
    }
  },
  Subscription: {}
});
