const { Op } = require('sequelize');
const Employee = require('../models/employee');
const HttpError = require('../models/http-error');

exports.getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return next(new HttpError('Employee not found', 404));
    }

    return res.status(200).json(employee);
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not find the employee right now.'
      ),
      500
    );
  }
};

exports.getEmployeesByName = async (req, res, next) => {
  try {
    const employeeName = req.params.name;
    const employees = await Employee.findAll({
      where: { name: { [Op.like]: `%${employeeName}%` } },
    });

    if (employees.length === 0) {
      return next(new HttpError('There is no Employee found', 404));
    }

    res.status(200).json(employees);
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not find employees right now.'
      ),
      500
    );
  }
};

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll();

    if (employees.length === 0) {
      return next(new HttpError('There is no Employee found', 404));
    }

    res.status(200).json(employees);
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not find employees right now.'
      ),
      500
    );
  }
};

exports.addEmployee = async (req, res, next) => {
  try {
    const employee = req.body;

    const createdEmployee = Employee.create(employee);

    if (!createdEmployee) {
      return next(
        new HttpError(
          'Something went wrong, could not create employee right now.'
        ),
        500
      );
    }

    res.status(201).json({ message: 'The employee was added successfully' });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not create employee right now.'
      ),
      500
    );
  }
};

exports.updateEmployee = async (req, res, next) => {
  const { id } = req.params;
  const updatedEmployee = req.body;

  try {
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return next(new HttpError('Employee not found', 404));
    }

    await employee.update({ ...updatedEmployee });

    await employee.save();

    res.status(200).json(employee);
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not update employee right now.'
      ),
      500
    );
  }
};

exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return next(new HttpError('Employee not found', 404));
    }

    await employee.destroy();

    res.status(200).json({ message: 'The employee was deleted successfully' });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not delete employee right now.'
      ),
      500
    );
  }
};
