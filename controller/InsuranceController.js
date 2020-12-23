const { generateInvoice } = require('../helper/generateInvoiceNumber');
const Insurance = require('../model/Insurance');
const Occupation = require('../model/Occupation');
const Invoice = require('../model/Invoice');

class InsuranceController {
  static async index(req, res, next) {
    try {
      const result = await Insurance.find();
      res.status(200).json({ policies: result });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  static async create(req, res, next) {
    try {
      const {
        period,
        OccupationId,
        price_object,
        construction,
        address,
        province,
        city,
        districts,
        area,
        earthquake,
      } = req.body;

      const payload = {
        period,
        OccupationId,
        price_object,
        construction,
        address,
        province,
        city,
        districts,
        area,
        earthquake,
      };

      const premi = await Occupation.findById(OccupationId);
      const invoiceData = await Invoice.find();
      const result = await Insurance.create(payload);
      const insurance = { ...result.ops[0] };
      /* eslint no-underscore-dangle: 0 */
      const InsuranceId = insurance._id;

      // Cek Premi
      const { rate, admin_fee } = premi;
      const base_premi = ((price_object * rate) / 1000) * period;
      // const total = base_premi + admin_fee;
      const invoicePayload = {
        invoice_number: generateInvoice(invoiceData),
        InsuranceId,
        base_premi,
        admin_fee,
        status: 'Belum Dibayar',
      };

      const invoice = await Invoice.create(invoicePayload);
      res.status(201).json({ invoice: invoice.ops[0], insurance });
    } catch (error) {
      res.status(400).json({ error });
      console.error(error);
    }
  }

  static async checkPremi(req, res) {
    try {
      const { period, OccupationId, price_object } = req.body;
      const premi = await Occupation.findById(OccupationId);
      const invoiceData = await Invoice.find();

      // Cek Premi
      const { rate, admin_fee } = premi;
      const base_premi = ((price_object * rate) / 1000) * period;
      const totalPremi = base_premi + admin_fee;
      const payload = {
        ...req.body,
        base_premi,
        admin_fee,
        totalPremi,
        invoice_number: generateInvoice(invoiceData),
      };

      res.status(201).json({ insurance: payload });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = InsuranceController;
