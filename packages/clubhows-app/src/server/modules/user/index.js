import jwt from 'jsonwebtoken';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { pick } from 'lodash';

import UserDAO from './mongodb';
import schema from './schema.graphqls';
import createResolvers from './resolvers';
import { refreshTokens, createTokens } from './auth';
import tokenMiddleware from './auth/token';
import confirmMiddleware from './confirm';
import Feature from '../connector';
import scopes from './auth/scopes';
import settings from '../../../../settings';
import log from '../../../common/log';

const SECRET = settings.user.secret;

const User = new UserDAO();

if (settings.user.auth.facebook.enabled) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: settings.user.auth.facebook.clientID,
        clientSecret: settings.user.auth.facebook.clientSecret,
        callbackURL: '/auth/facebook/callback',
        scope: ['email'],
        profileFields: ['id', 'emails', 'displayName']
      },
      async function(accessToken, refreshToken, profile, cb) {
        const { id, username, displayName, emails: [{ value }] } = profile;
        log('user index 33: ', profile);
        try {
          let user = await User.getUserByFbIdOrEmail(id, value);
          await log('user index 36: ', user);
          const { facebook: { fbId }, email } = user;
          await log('user index 38: ', fbId, email);
          if (fbId === undefined && email === undefined) {
            const isActive = true;
            const createdUserId = await User.createFacebookOauth({
              username: username ? username : displayName,
              email: value,
              password: id,
              facebook: {
                fbId: id,
                displayName: displayName,
                email: value
              },
              name: {
                fullName: displayName
              },
              role: 'user',
              isActive
            });
            log('user index 56: ', createdUserId);
            user = await User.getUser(createdUserId);
          } else {
            let name = user.name.fullName;
            if (name === null || name === undefined) name = displayName;

            await User.addFacebookOauth({
              _id: user._id,
              facebook: {
                fbId: id,
                displayName: displayName,
                email: value
              },
              name: {
                fullName: name
              }
            });
          }
          await log('user index 63: ', user);
          return cb(null, pick(user, ['_id', 'username', 'role', 'email']));
        } catch (err) {
          return cb(err, {});
        }
      }
    )
  );
}

export default new Feature({
  schema,
  createResolversFunc: createResolvers,
  createContextFunc: async (req, connectionParams, webSocket) => {
    let tokenUser = null;
    let auth = { isAuthenticated: false, scope: null };
    let serial = '';
    if (__DEV__) {
      // for local testing without client certificates
      serial = settings.user.auth.certificate.enabled;
    }

    if (
      connectionParams &&
      connectionParams.token &&
      connectionParams.token !== 'null' &&
      connectionParams.token !== 'undefined'
    ) {
      try {
        const { user } = jwt.verify(connectionParams.token, SECRET);
        tokenUser = user;
      } catch (err) {
        log('user index 95: ', User, connectionParams.token);
        const newTokens = await refreshTokens(connectionParams.token, connectionParams.refreshToken, User, SECRET);
        tokenUser = newTokens.user;
      }
    } else if (req) {
      if (req.user) {
        tokenUser = req.user;
      } else if (settings.user.auth.certificate.enabled) {
        const user = await User.getUserWithSerial(serial);
        if (user) {
          tokenUser = user;
        }
      }
    } else if (webSocket) {
      if (settings.user.auth.certificate.enabled) {
        // in case you need to access req headers
        if (webSocket.upgradeReq.headers['x-serial']) {
          serial = webSocket.upgradeReq.headers['x-serial'];
        }

        const user = await User.getUserWithSerial(serial);
        if (user) {
          tokenUser = user;
        }
      }
    }

    if (tokenUser) {
      auth = {
        isAuthenticated: true,
        scope: scopes[tokenUser.role]
      };
    }

    return {
      User,
      user: tokenUser,
      auth,
      SECRET,
      req
    };
  },
  middleware: app => {
    log('User.index 149: ', User);
    app.use(tokenMiddleware(SECRET, User, jwt));

    if (settings.user.auth.password.sendConfirmationEmail) {
      app.get('/confirmation/:token', confirmMiddleware(SECRET, User, jwt));
    }

    if (settings.user.auth.facebook.enabled) {
      app.use(passport.initialize());

      app.get('/auth/facebook', passport.authenticate('facebook'));

      app.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), async (req, res) => {
        log('User.index 165: ', req.user);
        const user = await User.getUser(req.user._id);
        const refreshSecret = SECRET + user.password;
        const [token, refreshToken] = await createTokens(req.user, SECRET, refreshSecret);

        req.universalCookies.set('x-token', token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true
        });
        req.universalCookies.set('x-refresh-token', refreshToken, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true
        });

        req.universalCookies.set('r-token', token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: false
        });
        req.universalCookies.set('r-refresh-token', refreshToken, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: false
        });
        log('User.index 184: ', res);
        res.redirect('/profile');
      });
    }
  }
});
