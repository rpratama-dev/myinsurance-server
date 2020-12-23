const Invoice = require('../model/Invoice');

class InvoiceController {
  static async index(req, res) {
    try {
      const result = await Invoice.finda();
      res.status(200).json({ invoices: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async show(req, res) {
    try {
      const { id } = req.params;
      const result = await Invoice.findById(id);
      res.status(200).json({ invoice: result });
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
      const result = await Invoice.findByIdAndUpdate(id, payload);
      res.status(200).json({ invoice: result.value });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = InvoiceController;
