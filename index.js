const express = require('express');
require('dotenv').config();

const sequelize = require('./util/database');
const Users = require('./models/users');

const app = express();

const PORT = process.env.PORT_NUMBER || 3030;
sequelize
  .sync()
  .then(() => {
    console.log('The database is ready..');
    app.listen(PORT, () => {
      console.log(`The Server is listenning on port: (${PORT})`);
    });
  })
  .catch((err) => console.log(err));
