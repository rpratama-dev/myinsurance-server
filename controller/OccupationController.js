const Occupation = require('../model/Occupation');

class OccupationController {
  static async index(req, res) {
    try {
      const result = await Occupation.find();
      res.status(200).json({ occupations: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { type, rate, admin_fee } = req.body;
      const payload = { type: type.toLowerCase(), rate, admin_fee };
      const result = await Occupation.create(payload);
      res.status(201).json({ occupation: result.ops[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async show(req, res) {
    try {
      const { id } = req.params;
      const result = await Occupation.findById(id);
      res.status(200).json({ occupation: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { type, rate, admin_fee } = req.body;
    const payload = { type: type.toLowerCase(), rate, admin_fee };
    try {
      const result = await Occupation.findByIdAndUpdate(id, payload);
      res.status(200).json({ occupation: result.value });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;

    try {
      const result = await Occupation.findByIdAndDelete(id);
      if (result.deletedCount < 1) {
        res.status(404).json({ response: 'Occupation ID Not found!' });
      } else {
        res.status(200).json({ occupation: 'Occupation deleted!' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OccupationController;
