const router = require('express').Router();
const InsuranceController = require('../controller/InsuranceController');

router.get('/', InsuranceController.index);
router.post('/', InsuranceController.create);
router.post('/cek-premi', InsuranceController.checkPremi);
router.put('/approve/:id', InsuranceController.approveInsurance);
router.post('/search', InsuranceController.customSearch);
router.get('/:id', InsuranceController.show);

module.exports = router;
