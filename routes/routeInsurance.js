const router = require('express').Router();
const InsuranceController = require('../controller/InsuranceController');
const { authAdmin } = require('../middleware/auth');

router.get('/', InsuranceController.index);
router.post('/', InsuranceController.create);
router.post('/cek-premi', InsuranceController.checkPremi);
router.put('/approve/:id', authAdmin, InsuranceController.approveInsurance);
router.post('/search', InsuranceController.customSearch);
router.get('/:id', InsuranceController.show);

module.exports = router;
