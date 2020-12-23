const router = require('express').Router();
const OccupationController = require('../controller/OccupationController');
const { authAdmin } = require('../middleware/auth');

router.get('/', OccupationController.index);
router.post('/', authAdmin, OccupationController.create);
router.get('/:id', OccupationController.show);
router.put('/:id', authAdmin, OccupationController.update);
router.delete('/:id', authAdmin, OccupationController.destroy);

module.exports = router;
