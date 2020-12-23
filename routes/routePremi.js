const router = require('express').Router();
const AssuranceController = require('../controller/InsuranceController');

router.get('/', AssuranceController.index);
router.post('/', AssuranceController.create);
router.post('/cek-premi', AssuranceController.checkPremi);

module.exports = router;
