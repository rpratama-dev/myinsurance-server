const router = require('express').Router();
const UserController = require('../controller/UserController');
const { authAdmin, authentication, authCustomer } = require('../middleware/auth');

router.get('/', authentication, UserController.index);
router.post('/admin', UserController.createAdmin);
router.post('/customer', UserController.createCustomer);
router.post('/login', UserController.login);

router.use(authentication);

router.get('/:id', UserController.show);
router.put('/:id', authCustomer, UserController.update);
router.delete('/:id', authAdmin, UserController.destroy);

module.exports = router;
