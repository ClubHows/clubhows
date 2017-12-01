/*eslint-disable no-unused-vars*/
import slugify from 'slugify';
import uuidv5 from 'uuid/v5';
import mongoose from 'mongoose';
import NodeGeocoder from 'node-geocoder';
import bcrypt from 'bcryptjs';

import mongodb from '../../../server/mongodb/connector';

import UserSchema from './User';
import log from '../../../common/log';

mongodb();

export default class UserDAO {
  getUser(id) {
    return UserSchema.getById(id);
  }

  getUserByUsername(username) {
    return UserSchema.getByUsername(username);
  }

  getUserByEmail(email) {
    return UserSchema.getByEmail(email);
  }

  async getUserWithPassword(id) {
    return UserSchema.getById(id);
  }

  getUserWithSerial(serial) {
    return UserSchema.getBySerial(serial);
  }

  currentUser(id) {
    return UserSchema.getById(id);
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
    log('61', username, email, password, role, isActive);
    const passwordHashed = await bcrypt.hashSync(password, 12);
    log('63', passwordHashed);
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
    return await UserSchema.findOne()
      .where('facebook.id' === id)
      .orWhere('email' === email);
  }

  createFacebookOauth({ username, email, userId, facebook, role, isActive }) {
    return UserSchema.create({
      _id: uuidv5(email, process.env.CLUBHOWS_APP_UUID),
      username: username,
      email: email,
      facebook: {
        fb_id: facebook.id,
        display_name: facebook.displayName,
        email: facebook.email
      },
      role: role,
      isActive: !!isActive
    });
  }

  addFacebookOauth({ _id, facebook }) {
    return UserSchema.update(_id, {
      facebook: {
        fb_id: facebook.id,
        display_name: facebook.displayName,
        email: facebook.email
      }
    });
  }

  async updatePassword({ id, password }) {
    const passwordHashed = await bcrypt.hashSync(password, 12);
    return UserSchema.save(id, { password: password });
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
