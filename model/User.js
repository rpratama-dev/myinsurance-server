const mongodb = require('mongodb');
const config = require('../config/atlas');

const { getDatabase } = config;

const asurance = () => getDatabase('users');

const { ObjectId } = mongodb;

class Assurance {
  static find() {
    return asurance().find({ password: 0 }).toArray();
  }

  static findByEmail(email) {
    return asurance().findOne({ email });
  }

  static findById(id) {
    return asurance().findOne({ _id: ObjectId(id) }, { password: 0 });
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
