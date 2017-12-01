import mongoose from 'mongoose';
import uuidv5 from 'uuid/v5';

import log from '../../../common/log';

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv5('clubhows-team', process.env.CLUBHOWS_APP_UUID),
    required: true
  },
  username: { type: String, required: true, max: 50 },
  email: { type: String, required: true, max: 50 },
  password: { type: String, required: true, max: 100 },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'manager', 'editor', 'member', 'user'],
    default: 'member'
  },
  name: {
    firstName: String,
    lastName: String,
    fullName: String
  },
  facebook: {
    fbId: String,
    displayName: String,
    accessToken: String,
    expiresAt: Date,
    email: String,
    firstName: String,
    lastName: String,
    link: String,
    gender: String,
    locale: String
  },
  auth_certificate: String,
  is_active: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.statics = {
  async getById(id) {
    log('User 46:', id);
    return await this.findById(id)
      .exec()
      .then(user => {
        log('User 50:', user);
        return user;
      })
      .catch(err => {
        log('User 54:', err);
        return 'error occured';
      });
  },
  async getBySerial(serial) {
    return await this.findOne({ auth_certificate: serial })
      .exec()
      .then(user => {
        log(user);
        return user;
      })
      .catch(err => {
        log(err);
        return 'error occured';
      });
  },
  async getByEmail(email) {
    return await this.findOne({ email: email })
      .exec()
      .then(user => {
        log(user);
        return user;
      })
      .catch(err => {
        log(err);
        return 'error occured';
      });
  },
  async getByPassword(password) {
    return await this.findOne({ password: password })
      .exec()
      .then(user => {
        log(user);
        return user;
      })
      .catch(err => {
        log(err);
        return 'error occured';
      });
  },
  async getByUsername(username) {
    return await this.findOne({ username: username })
      .exec()
      .then(user => {
        log(user);
        return user;
      })
      .catch(err => {
        log(err);
        return 'error occured';
      });
  },
  async list({ skip = 0, limit = 50 } = {}) {
    return await this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

export default mongoose.model('User', UserSchema, 'User');
