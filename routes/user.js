const expres = require('express');

const userControler = require('../controllers/user');

const router = expres.Router();

router.get('/:id', userControler.getUserById);

router.get('/', userControler.getAllUsers);

router.post('/', userControler.addUser);

router.put('/:id', userControler.updateUser);

router.delete('/:id', userControler.deleteUser);

// Auth
router.post('/signup', (req, res, next) => res.send('Singup'));

router.post('/login', (req, res, next) => res.send('Login'));

module.exports = router;
