const router = require('express').Router();
const { authentication } = require('../middleware/auth');
const routeInsurance = require('./routeInsurance');
const routeOccupation = require('./routeOccupation');
const routeUser = require('./routeUser');

router.get('/', (req, res) => {
  res.status(200).json({ status: 200, response: 'Connected' });
});

router.use('/users', routeUser);
router.use(authentication);
router.use('/insurance', routeInsurance);
router.use('/occupation', routeOccupation);

module.exports = router;
