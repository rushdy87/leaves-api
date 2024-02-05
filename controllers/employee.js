const { Op } = require('sequelize');
const Employee = require('../models/employee');

exports.getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
  }
};

exports.getEmployeesByName = async (req, res, next) => {
  try {
    const employeeName = req.params.name;
    const employees = await Employee.findAll({
      where: { name: { [Op.like]: `%${employeeName}%` } },
    });

    if (employees.length === 0) {
      return res.status(404).json({ error: 'No Employee found' });
    }

    res.status(200).json(employees);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll();

    if (employees.length === 0) {
      return res.status(404).json({ message: 'There is no employee found' });
    }

    res.status(200).json(employees);
  } catch (error) {
    console.log(error);
  }
};

exports.addEmployee = async (req, res, next) => {
  try {
    const employee = req.body;

    const createdEmployee = Employee.create(employee);

    if (!createdEmployee) {
      res.status(500).json({ message: 'There is an error occurs' });
    }

    res.status(201).json({ message: 'The employee was added successfully' });
  } catch (error) {
    console.log(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  const { id } = req.params;
  const updatedEmployee = req.body;

  try {
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.update({ ...updatedEmployee });

    await employee.save();

    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.destroy();

    res.status(200).json({ message: 'The employee was deleted successfully' });
  } catch (error) {
    console.log(error);
  }
};
