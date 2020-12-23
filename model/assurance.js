const mongodb = require('mongodb');
const config = require('../config/atlas');

const { getDatabase } = config;

const asurance = () => getDatabase('asurance');

const { ObjectId } = mongodb;

class Assurance {
  static find() {
    return asurance().find().toArray();
  }

  static findById(id) {
    return asurance().findOne({ _id: ObjectId(id) });
  }

  static create(newAssurance) {
    return asurance().insertOne(newAssurance);
  }

  static findByIdAndUpdate(id, updatedData) {
    return asurance().findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updatedData },
      {
        returnOriginal: false,
      },
    );
  }

  static findByIdAndDelete(id) {
    return asurance().deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Assurance;
