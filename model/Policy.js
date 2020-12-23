const mongodb = require('mongodb');
const config = require('../config/atlas');

const { getDatabase } = config;

const policy = () => getDatabase('policies');

const { ObjectId } = mongodb;

class Policy {
  static find() {
    return policy().find().toArray();
  }

  static findById(id) {
    return policy().findOne({ _id: ObjectId(id) });
  }

  static create(newPolicy) {
    return policy().insertOne(newPolicy);
  }

  static findByIdAndUpdate(id, updatedData) {
    return policy().findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updatedData },
      {
        returnOriginal: false,
      },
    );
  }

  static findByIdAndDelete(id) {
    return policy().deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Policy;
