import mongoose from 'mongoose';
import uuidv5 from 'uuid/v5';
import log from '../../../common/log';

const LocationSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv5('clubhows-location', process.env.CLUBHOWS_APP_UUID),
    required: true
  },
  name: { type: String, required: true, max: 50 },
  coords: [
    {
      lat: { type: mongoose.Schema.Types.Decimal, max: 50 }, // eslint-disable-line no-undef
      lon: { type: mongoose.Schema.Types.Decimal, max: 50 } // eslint-disable-line no-undef
    }
  ],
  add1: { type: String, max: 100 },
  add2: { type: String, max: 100 },
  city: { type: String, max: 100 },
  state: { type: String, max: 100 },
  zip: { type: String, max: 100 },
  country: { type: String, max: 2 },
  phones: mongoose.Schema.Types.Mixed
});

const TeamSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv5('clubhows-team', process.env.CLUBHOWS_APP_UUID),
    required: true
  },
  name: { type: String, required: true, max: 50 },
  slug: { type: String, required: true, max: 50 },
  members: [
    // eslint-disable-next-line flowtype/no-types-missing-file-annotation
    {
      user: { type: String, ref: 'User' },
      role: {
        type: String,
        required: true,
        enum: ['admin', 'manager', 'editor', 'member'],
        default: 'member'
      },
      locations: [String]
    }
  ],
  locations: [LocationSchema],
  active: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

TeamSchema.statics = {
  async getById(id) {
    return await this.findById(id._id)
      .exec()
      .then(team => {
        log(team);
        return team;
      })
      .catch(err => {
        log(err);
        return 'error occured';
      });
  },
  async getBySlug(slug) {
    return await this.findOne({ slug: slug }).then(team => team);
  },
  async getByMember(memberId) {
    return await this.find({ 'members.user': memberId })
      .exec()
      .then(team => {
        log('team Team 74:', team);
        const member = typeof team != 'undefined' && team != null && team.length > 0 ? team : 'empty';
        log('team Team 76:', member);
        return member;
      })
      .catch(err => {
        log('team Team 78:', err);
        return 'error occured';
      });
  },
  async getByLocation(locId) {
    return await this.find({ 'locations._id': new mongoose.Types.ObjectId(locId) }).then(team => team);
  },
  async list({ skip = 0, limit = 50 } = {}) {
    return await this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

export default mongoose.model('Team', TeamSchema, 'Team');
