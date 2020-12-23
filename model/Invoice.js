const mongodb = require('mongodb');
const config = require('../config/atlas');

const { getDatabase } = config;

const invoice = () => getDatabase('invoices');

const { ObjectId } = mongodb;

class Invoice {
  static find() {
    return invoice().find().toArray();
  }

  static findById(id) {
    return invoice()
      .aggregate([
        {
          $lookup: {
            from: 'insurance',
            foreignField: '_id',
            localField: 'InsuranceId',
            as: 'insurance',
          },
        },
        { $match: { _id: ObjectId(id) } },
      ])
      .toArray();
    // return invoice().findOne({ _id: ObjectId(id) });
  }

  static create(newInvoice) {
    return invoice().insertOne(newInvoice);
  }

  static findByIdAndUpdate(id, updatedData) {
    return invoice().findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updatedData },
      {
        returnOriginal: false,
      },
    );
  }

  static findByIdAndDelete(id) {
    return invoice().deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Invoice;
