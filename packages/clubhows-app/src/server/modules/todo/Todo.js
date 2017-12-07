import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  owner: { type: String },
  items: [ItemSchema],
  isPrivate: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ListSchema.statics = {
  async getListById(_id) {
    return await this.findById(_id)
      .exec()
      .then(list => {
        return list;
      })
      .catch(err => {
        return `List getById error: ${err}`;
      });
  },
  async getListBySlug(slug) {
    return await this.findOne({ 'list.slug': slug }).then(list => list);
  },
  async getListByOwner(ownerId) {
    return await this.find({ 'list.owner': new mongoose.Types.ObjectId(ownerId) }).then(list => list);
  },
  async lists({ skip = 0, limit = 50 } = {}) {
    return await this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
  async removeListbyId(_id) {
    return await this.findByIdAndRemove(_id);
  }
};

const ItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  author: { type: String, required: true },
  completed: { type: Boolean, default: false },
  order: { type: Number }
});

export default mongoose.model('List', ListSchema, 'List');
