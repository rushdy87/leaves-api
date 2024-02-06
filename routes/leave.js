const expres = require('express');

const leaveController = require('../controllers/leave');

const router = expres.Router();

router.post('/', leaveController.addLeave);

module.exports = router;
