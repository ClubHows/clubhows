/*eslint-disable no-unused-vars*/
import slugify from 'slugify';
import uuidv5 from 'uuid/v5';
import mongoose from 'mongoose';
import NodeGeocoder from 'node-geocoder';
import bcrypt from 'bcryptjs';

import mongodb from '../../../server/mongodb';

import UserSchema from './User';
import log from '../../../common/log';

mongodb();

export default class UserDAO {
  getUser(id) {
    log('mongodb 17:', id);
    return UserSchema.getById(id);
  }

  getUserByUsername(username) {
    return UserSchema.getByUsername(username);
  }

  getUserByEmail(email) {
    return UserSchema.getByEmail(email);
  }

  async getUserWithPassword(id) {
    log('mongodb 30:', id);
    return UserSchema.getById(id);
  }

  getUserWithSerial(serial) {
    return UserSchema.getBySerial(serial);
  }

  async getUsers(orderby, sortby) {
    return await UserSchema.list()
      .sort(sortby)
      .exec((err, results) => {
        if (!err) {
          results.filter(sortby => {
            return results.sortby;
          });
        }
      });
  }

  async usersPagination(limit, after) {
    return await UserSchema.find()
      .select('name')
      .limit(limit)
      .skip(after)
      .sort({ name: 'asc' });
  }

  async addUser({ username, email, password, role, isActive }) {
    const passwordHashed = await bcrypt.hashSync(password, 12);
    if (role === undefined) {
      role = 'user';
    }

    return UserSchema.create({
      _id: uuidv5(email, process.env.CLUBHOWS_APP_UUID),
      username: username,
      email: email,
      password: passwordHashed,
      role: role,
      isActive: !!isActive
    });
  }

  async getUserByFbIdOrEmail(id, email) {
    const userCheck = await UserSchema.findOne({ $or: [{ email: email }, { 'facebook.fbId': id }] });
    log('mongodb 75:', userCheck);
    return userCheck;
  }

  async createFacebookOauth({ username, email, userId, facebook, name, role, isActive }) {
    log('mongodb 81:', username, email, userId, facebook, name, role, isActive);
    return await UserSchema.create({
      _id: uuidv5(email, process.env.CLUBHOWS_APP_UUID),
      username: username,
      email: email,
      facebook: {
        fbId: facebook.fbId,
        displayName: facebook.displayName,
        email: facebook.email
      },
      name: {
        fullName: name.fullName
      },
      role: role,
      isActive: isActive
    });
  }

  addFacebookOauth({ _id, facebook, name }) {
    log('mongodb 100:', _id, facebook, name);
    return UserSchema.update(
      { _id: _id },
      {
        facebook: {
          fbId: facebook.fbId,
          displayName: facebook.displayName,
          email: facebook.email
        },
        name: {
          fullName: name.fullName
        }
      }
    );
  }

  async getUserByGoogleIdOrEmail(id, email) {
    const userCheck = await UserSchema.findOne({ $or: [{ email: email }, { 'google.googleId': id }] });
    log('mongodb 118:', userCheck);
    return userCheck;
  }

  async createGoogleOauth({ username, email, password, avatar, userId, google, name, role, isActive }) {
    log('mongodb 123:', username, email, password, avatar, userId, google, name, role, isActive);
    const passwordHashed = await bcrypt.hashSync(password, 12);
    return await UserSchema.create({
      _id: uuidv5(email, process.env.CLUBHOWS_APP_UUID),
      username: username,
      email: email,
      password: passwordHashed,
      avatar: avatar,
      google: {
        googleId: google.googleId,
        displayName: google.displayName,
        firstName: google.firstName,
        lastName: google.lastName,
        email: google.email
      },
      name: {
        firstName: name.firstName,
        lastName: name.lastName,
        fullName: name.fullName
      },
      role: role,
      isActive: isActive
    });
  }

  addGoogleOauth({ _id, avatar, google, name }) {
    log('mongodb 145:', _id, google, name);
    return UserSchema.update(
      { _id: _id },
      {
        facebook: {
          fbId: google.googleId,
          displayName: google.displayName,
          email: google.email
        },
        name: {
          fullName: name.fullName
        },
        avatar: avatar
      }
    );
  }

  async updatePassword(_id, password) {
    const passwordHashed = await bcrypt.hashSync(password, 12);
    return UserSchema.update({ _id: _id }, { password: passwordHashed });
  }

  async updateActive(_id, isActive) {
    return UserSchema.update({ _id: _id }, { is_active: isActive });
  }

  editUser({ id, username, email, name }) {
    return UserSchema.save(id, {
      username: username,
      email: email,
      name: {
        first_name: String,
        last_name: String
      }
    });
  }

  editAuthCertificate({ id, auth_certificate }) {
    return UserSchema.save(id, {
      auth_certificate: auth_certificate
    });
  }

  async countUsers() {
    return UserSchema.statics.count();
  }
}
