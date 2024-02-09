const expres = require('express');

const employeesController = require('../controllers/employee');
const checkAuth = require('../middlewares/check-auth');
const checkRole = require('../middlewares/check-role');

const router = expres.Router();

router.use(checkAuth);

router.get('/:id', checkRole(), employeesController.getEmployeeById);

router.get('/names/:name', checkRole(), employeesController.getEmployeesByName);

router.get('/', checkRole(), employeesController.getAllEmployees);

router.post('/', checkRole(), employeesController.addEmployee);

router.put('/:id', checkRole(), employeesController.updateEmployee);

router.delete('/:id', checkRole(), employeesController.deleteEmployee);
module.exports = router;
