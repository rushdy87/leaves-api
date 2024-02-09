const expres = require('express');

const leaveController = require('../controllers/leave');
const checkAuth = require('../middlewares/check-auth');
const checkRole = require('../middlewares/check-role');
const { ROLE } = require('../util/roles');

const router = expres.Router();

router.use(checkAuth);

router.post('/', checkRole(), leaveController.addLeave);

router.get('/', checkRole(), leaveController.getAllLeaves);

router.get('/waiting-leaves', checkRole(), leaveController.getWaitingLeaves);

router.put('/:id', checkRole(), leaveController.updateLeave);

// Admin Role
router.put(
  '/print/send-to-print/:id',
  checkRole(ROLE.ADMIN),
  leaveController.sendToPrint
);
router.put(
  '/print/send-all-to-print',
  checkRole(ROLE.ADMIN),
  leaveController.sendAllToPrint
);
router.put(
  '/print/rejecte-leave/:id',
  checkRole(ROLE.ADMIN),
  leaveController.rejecteLeave
);

// after print
router.put(
  '/print/printing-leave/:id',
  checkRole(),
  leaveController.printingLeave
);
router.put(
  '/print/printing-all-leaves',
  checkRole(),
  leaveController.printingAllLeave
);

module.exports = router;
