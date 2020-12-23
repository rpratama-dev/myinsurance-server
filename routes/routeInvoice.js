const router = require('express').Router();
const InvoiceController = require('../controller/InvoiceController');

router.get('/', InvoiceController.index);
router.get('/:id', InvoiceController.show);
router.patch('/:id', InvoiceController.patch);

module.exports = router;
