const { generateInvoice } = require('../helper/generateInvoiceNumber');
const Assurance = require('../model/assurance');

class AssuranceController {
  static async index(req, res, next) {
    try {
      const result = await Assurance.find();
      res.status(200).json({ policies: result });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  static async create(req, res, next) {
    try {
      const {
        period,
        okupasi,
        harga_bangunan,
        konstruksi,
        alamat,
        provinsi,
        kota,
        kabupaten,
        daerah,
        gempa,
        premiDasar,
        biayaAdmin,
        totalPremi,
        invoiceNumber,
      } = req.body;

      const payload = {
        period,
        okupasi,
        harga_bangunan,
        konstruksi,
        alamat,
        provinsi,
        kota,
        kabupaten,
        daerah,
        gempa,
        premiDasar,
        biayaAdmin,
        totalPremi,
        invoiceNumber,
      };

      const result = await Assurance.create(payload);
      res.status(201).json({ response: result.ops[0] });
    } catch (error) {
      res.status(400).json({ error });
      console.error(error);
    }
  }

  static async checkPremi(req, res, next) {
    try {
      const result = await Assurance.find();

      const { period, okupasi, harga_bangunan } = req.body;
      const rate = { rumah: 0.3875, ruko: 0.5 };
      const ratePremi = rate[okupasi];
      const biayaAdmin = 10000;
      const premiDasar = ((harga_bangunan * ratePremi) / 1000) * period;
      const total = premiDasar + biayaAdmin;

      const payload = {
        ...req.body,
        premiDasar,
        biayaAdmin,
        totalPremi: total,
        invoiceNumber: generateInvoice(result),
      };

      res.status(201).json({ result: payload });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = AssuranceController;
