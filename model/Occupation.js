const mongodb = require('mongodb');
const config = require('../config/atlas');

const { getDatabase } = config;

const occupation = () => getDatabase('occupations');

const { ObjectId } = mongodb;

class Occupation {
  static find() {
    return occupation().find().toArray();
  }

  static findById(id) {
    return occupation().findOne({ _id: ObjectId(id) });
  }

  static create(newOccupation) {
    return occupation().insertOne(newOccupation);
  }

  static findByIdAndUpdate(id, updatedData) {
    return occupation().findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updatedData },
      {
        returnOriginal: false,
      },
    );
  }

  static findByIdAndDelete(id) {
    return occupation().deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Occupation;
