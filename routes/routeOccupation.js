const router = require('express').Router();
const OccupationController = require('../controller/OccupationController');

router.get('/', OccupationController.index);
router.post('/', OccupationController.create);
router.get('/:id', OccupationController.show);
router.put('/:id', OccupationController.update);
router.delete('/:id', OccupationController.destroy);

module.exports = router;
