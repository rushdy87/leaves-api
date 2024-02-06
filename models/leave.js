const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Employee = require('./employee');

const Leave = sequelize.define('leaves', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'employees',
      key: 'id',
    },
  },
  request_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  leave_type: {
    type: DataTypes.ENUM('regular', 'gatebass'),
    defaultValue: 'regular',
  },
  starting_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('wait', 'accepted', 'rejected', 'finsh'),
    allowNull: false,
    defaultValue: 'wait',
  },
});

Employee.hasMany(Leave, { foreignKey: 'employee_id' });
Leave.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = Leave;
