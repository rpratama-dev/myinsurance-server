const User = require('../model/User');

class UserController {
  static async index(req, res) {
    try {
      const result = await User.find();
      res.status(200).json({ users: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createAdmin(req, res) {
    try {
      const { name, email, password } = req.body;
      const role = 'Admin';
      const payload = { name, email, password, role };
      const result = await User.create(payload);
      res.status(201).json({ user: result.ops[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async createCustomer(req, res) {
    try {
      const { name, email, password } = req.body;
      const role = 'Customer';
      const payload = { name, email, password, role };
      const result = await User.create(payload);
      res.status(201).json({ user: result.ops[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async show(req, res) {
    try {
      const { id } = req.params;
      const result = await User.findById(id);
      delete result.password;
      res.status(200).json({ user: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { type, rate } = req.body;
    const payload = { type: type.toLowerCase(), rate };
    try {
      const result = await User.findByIdAndUpdate(id, payload);
      res.status(200).json({ user: result.value });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;

    try {
      const result = await User.findByIdAndDelete(id);
      if (result.deletedCount < 1) {
        res.status(404).json({ response: 'User ID Not found!' });
      } else {
        res.status(200).json({ user: 'User deleted!' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async loginCustomer(req, res) {
    try {
      const { type, rate } = req.body;
      const payload = { type: type.toLowerCase(), rate };
      const result = await User.create(payload);
      res.status(201).json({ user: result.ops[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
