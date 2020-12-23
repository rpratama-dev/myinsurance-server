const createError = require('http-errors');
const { hashPassword, comparePassword } = require('../helper/bcrypt');
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
      const hash = hashPassword(password);
      const payload = { name, email, password: hash, role };
      const result = await User.create(payload);
      const user = { ...result.ops[0] };
      delete user.password;
      res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async createCustomer(req, res) {
    try {
      const { name, email, password } = req.body;
      const role = 'Customer';
      const hash = hashPassword(password);
      const payload = { name, email, password: hash, role };
      const result = await User.create(payload);
      const user = { ...result.ops[0] };
      delete user.password;
      res.status(201).json({ user });
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
    const { name, email } = req.body;
    const payload = { name, email };
    try {
      const result = await User.findByIdAndUpdate(id, payload);
      const user = { ...result.value };
      delete user.password;
      res.status(200).json({ user });
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

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (user) {
        const match = comparePassword(password, user.password);
        if (match) {
          delete user.password;
          res.status(200).json({ user });
        } else {
          throw createError(401, 'Wrong email / password');
        }
      } else {
        throw createError(401, 'Wrong email / password');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
