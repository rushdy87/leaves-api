const expres = require('express');

const leaveController = require('../controllers/leave');

const router = expres.Router();

router.post('/', leaveController.addLeave);

router.get('/', leaveController.getAllLeaves);

router.get('/waiting-leaves', leaveController.getWaitingLeaves);

router.put('/:id', leaveController.updateLeave);

// ذني للمانجر ليفل بس..
router.put('/print/send-to-print/:id', leaveController.sendToPrint);
router.put('/print/send-all-to-print', leaveController.sendAllToPrint);
router.put('/print/rejecte-leave/:id', leaveController.rejecteLeave);

// after print
router.put('/printing-leave/:id', leaveController.printingLeave);
// router.put('/printing-leave', leaveController.printingAllLeave);

module.exports = router;
