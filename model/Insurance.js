const mongodb = require('mongodb');
const config = require('../config/atlas');

const { getDatabase } = config;

const insurance = () => getDatabase('insurance');

const { ObjectId } = mongodb;

class Insurance {
  static find() {
    return insurance().find().toArray();
  }

  static findById(id) {
    return insurance().findOne({ _id: ObjectId(id) });
  }

  static create(newInsurance) {
    return insurance().insertOne(newInsurance);
  }

  static findByIdAndUpdate(id, updatedData) {
    return insurance().findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updatedData },
      {
        returnOriginal: false,
      },
    );
  }

  static findByIdAndDelete(id) {
    return insurance().deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Insurance;
