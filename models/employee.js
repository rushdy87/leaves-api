const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Employee = sequelize.define('employees', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  record_number: {
    type: DataTypes.INTEGER,
  },
  job_title: {
    type: DataTypes.STRING,
  },
});

module.exports = Employee;
