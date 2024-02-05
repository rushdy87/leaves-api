const express = require('express');
require('dotenv').config();

const sequelize = require('./util/database');

const usersRouter = require('./routes/user');

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);

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
