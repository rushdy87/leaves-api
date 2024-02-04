const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'sqlite',
    host: './data/leaves.sqlite',
  }
);

module.exports = sequelize;
