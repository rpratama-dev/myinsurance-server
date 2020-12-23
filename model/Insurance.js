const mongodb = require('mongodb');
const config = require('../config/atlas');

const { getDatabase } = config;

const insurance = () => getDatabase('insurance');

const { ObjectId } = mongodb;

class Insurance {
  static find() {
    return insurance()
      .aggregate([
        {
          $lookup: {
            let: {
              userObjId: {
                $toObjectId: '$user_id',
              },
            },
            from: 'users',
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$userObjId'] } } },
              { $project: { password: 0 } },
            ],
            as: 'user',
          },
        },
      ])
      .toArray();
  }

  // static findById(id) {
  //   return insurance().findOne({ _id: ObjectId(id) });
  // }

  static findById(id) {
    console.log('id', id);
    return insurance()
      .aggregate([
        {
          $lookup: {
            let: {
              userObjId: {
                $toObjectId: '$user_id',
              },
            },
            from: 'users',
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$userObjId'] } } },
              { $project: { password: 0 } },
            ],
            as: 'user',
          },
        },
        { $match: { _id: ObjectId(id) } },
      ])
      .toArray();
  }

  static findByCustome() {
    return insurance().findOne({ 'user.email': 'lia@mail.com' });
    // .toArray();
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
