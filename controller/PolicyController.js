const Policy = require('../model/Policy');

class PolicyController {
  static async index(req, res) {
    try {
      const result = await Policy.find();
      res.status(200).json({ policies: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // static async create(req, res) {
  //   try {
  //     const { type, rate, admin_fee } = req.body;
  //     const payload = { type: type.toLowerCase(), rate, admin_fee };
  //     const result = await Policy.create(payload);
  //     res.status(201).json({ policy: result.ops[0] });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: error.message });
  //   }
  // }

  static async show(req, res) {
    try {
      const { id } = req.params;
      const result = await Policy.findById(id);
      res.status(200).json({ policy: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async patch(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const payload = { status };
    try {
      const result = await Policy.findByIdAndUpdate(id, payload);
      res.status(200).json({ policy: result.value });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;
    try {
      const result = await Policy.findByIdAndDelete(id);
      if (result.deletedCount < 1) {
        res.status(404).json({ response: 'Policy ID Not found!' });
      } else {
        res.status(200).json({ policy: 'Policy deleted!' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PolicyController;
