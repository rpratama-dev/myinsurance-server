const router = require('express').Router();
const routePremi = require('./routePremi');

router.get('/', (req, res) => {
  res.status(200).json({ status: 200, response: 'Connected' });
});

router.use('/premi', routePremi);

module.exports = router;
