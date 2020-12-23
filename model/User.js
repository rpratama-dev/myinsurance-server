const mongodb = require('mongodb');
const config = require('../config/atlas');

const { getDatabase } = config;

const user = () => getDatabase('users');

const { ObjectId } = mongodb;

class User {
  static find() {
    return user()
      .find({}, { projection: { password: 0 } })
      .toArray();
  }

  static findByEmail(email) {
    return user().findOne({ email });
  }

  static findById(id) {
    return user().findOne({ _id: ObjectId(id) }, { projection: { password: 0 } });
  }

  static create(newUser) {
    return user().insertOne(newUser);
  }

  static findByIdAndUpdate(id, updatedData) {
    return user().findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updatedData },
      {
        returnOriginal: false,
      },
    );
  }

  static findByIdAndDelete(id) {
    return user().deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = User;
