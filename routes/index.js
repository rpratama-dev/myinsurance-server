const router = require('express').Router();
const routePremi = require('./routePremi');
const routeOccupation = require('./routeOccupation');

router.get('/', (req, res) => {
  res.status(200).json({ status: 200, response: 'Connected' });
});

router.use('/insurance', routePremi);
router.use('/occupation', routeOccupation);

module.exports = router;
