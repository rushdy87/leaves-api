const expres = require('express');

const employeesController = require('../controllers/employee');

const router = expres.Router();

router.get('/:id', employeesController.getEmployeeById);

router.get('/names/:name', employeesController.getEmployeesByName);

router.get('/', employeesController.getAllEmployees);

router.post('/', employeesController.addEmployee);

router.put('/:id', employeesController.updateEmployee);

router.delete('/:id', employeesController.deleteEmployee);
module.exports = router;
