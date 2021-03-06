const { generateInvoice } = require('../helper/generateNumber');
const Insurance = require('../model/Insurance');
const Occupation = require('../model/Occupation');
// const User = require('../model/User');

class InsuranceController {
  static async index(req, res, next) {
    try {
      const result = await Insurance.find();
      res.status(200).json({ insurance: result });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  static async show(req, res) {
    const { id } = req.params;
    try {
      const result = await Insurance.findById(id);
      res.status(200).json({ insurance: result });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error });
    }
  }

  static async create(req, res, next) {
    try {
      const {
        OccupationId,
        period,
        price_object,
        construction,
        address,
        province,
        city,
        area,
        earthquake,
      } = req.body;
      const { _id } = req.userLogedIn;
      // console.log(OccupationId);
      const premi = await Occupation.findById(OccupationId);
      // const user = await User.findById('5fe3795533541d3cb096b6e2');

      const insuranceData = await Insurance.find();

      // Cek Premi
      const { rate } = premi;
      const base_premi = ((price_object * rate) / 1000) * period;

      const payload = {
        user_id: String(_id),
        occupation: premi,
        invoice: {
          invoice_number: generateInvoice(insuranceData),
          base_premi,
          is_paid: false,
        },
        policy: {
          policy_number: null,
          policy_type: 'Kebakaran',
        },
        period,
        price_object,
        construction,
        addresses: {
          address,
          province,
          city,
          area,
        },
        expansion: {
          earthquake,
        },
        is_approved: false,
      };

      const insurance = await Insurance.create(payload);
      res.status(201).json({ insurance: insurance.ops[0] });
    } catch (error) {
      res.status(400).json({ error });
      console.error(error);
    }
  }

  static async checkPremi(req, res) {
    try {
      const { period, OccupationId, price_object } = req.body;
      const premi = await Occupation.findById(OccupationId);
      const insuranceData = await Insurance.find();
      // Cek Premi
      const { rate, admin_fee, type } = premi;
      const base_premi = ((price_object * rate) / 1000) * period;
      const totalPremi = base_premi + admin_fee;
      const payload = {
        ...req.body,
        base_premi,
        admin_fee,
        totalPremi,
        occupation: type,
        policy_type: 'Kebakaran',
        invoice_number: generateInvoice(insuranceData),
      };

      console.log('payload', payload);
      res.status(200).json({ insurance: payload });
    } catch (error) {
      console.error(error);
    }
  }

  static async approveInsurance(req, res) {
    const { id } = req.params;
    const { is_approved } = req.body;
    try {
      const raw = await Insurance.findById(id);
      const insuranceData = { ...raw[0] };
      insuranceData.invoice.is_paid = is_approved;
      insuranceData.policy.policy_number = is_approved
        ? `K.01.${insuranceData.invoice.invoice_number.slice(2)}`
        : null;
      insuranceData.is_approved = is_approved;
      const payload = { ...insuranceData };
      delete payload.user;

      await Insurance.findByIdAndUpdate(id, payload);
      res.status(200).json({ insurance: insuranceData });

      // const sorting
    } catch (error) {
      console.error(error);
      res.status(400).json({ error });
    }
  }

  static async customSearch(req, res) {
    const option = { user: { email: 'moulia@mail.com' } };
    try {
      const result = await Insurance.findByCustome(option);
      res.status(200).json({ insurance: result });
    } catch (error) {
      console.error(error);
    }
    // { size: { h: 14, w: 21, uom: 'cm' } }
  }
}

module.exports = InsuranceController;
