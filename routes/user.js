const expres = require('express');

const userControler = require('../controllers/user');
const checkAuth = require('../middlewares/check-auth');

const router = expres.Router();

router.post('/login', userControler.login);

router.use(checkAuth);

router.get('/:id', userControler.getUserById);

router.get('/', userControler.getAllUsers);

router.post('/', userControler.addUser);

router.put('/:id', userControler.updateUser);

router.delete('/:id', userControler.deleteUser);

module.exports = router;
