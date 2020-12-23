const router = require('express').Router();
const AssuranceController = require('../controller/AssuranceController');

router.get('/', AssuranceController.index);
router.post('/', AssuranceController.create);
router.post('/cek-premi', AssuranceController.checkPremi);

module.exports = router;
