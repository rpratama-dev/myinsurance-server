const router = require('express').Router();
const routeInsurance = require('./routeInsurance');
const routeOccupation = require('./routeOccupation');
const routeUser = require('./routeUser');

router.get('/', (req, res) => {
  res.status(200).json({ status: 200, response: 'Connected' });
});

router.use('/insurance', routeInsurance);
router.use('/occupation', routeOccupation);
router.use('/users', routeUser);

module.exports = router;
