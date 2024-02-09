const expres = require('express');

const userControler = require('../controllers/user');
const checkAuth = require('../middlewares/check-auth');
const checkRole = require('../middlewares/check-role');
const { ROLE } = require('../util/roles');

const router = expres.Router();

router.post('/login', userControler.login);

router.use(checkAuth);

router.get('/:id', checkRole(ROLE.ADMIN), userControler.getUserById);

router.get('/', checkRole(ROLE.ADMIN), userControler.getAllUsers);

router.post('/', checkRole(ROLE.ADMIN), userControler.addUser);

router.put('/:id', checkRole(ROLE.ADMIN), userControler.updateUser);

router.delete('/:id', checkRole(ROLE.ADMIN), userControler.deleteUser);

module.exports = router;
