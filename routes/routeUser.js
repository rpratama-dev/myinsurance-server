const router = require('express').Router();
const UserController = require('../controller/UserController');

router.get('/', UserController.index);
router.post('/admin', UserController.createAdmin);
router.post('/customer', UserController.createCustomer);
router.post('/login', UserController.login);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router;
