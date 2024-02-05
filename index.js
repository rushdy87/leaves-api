const express = require('express');
require('dotenv').config();

const sequelize = require('./util/database');

const usersRouters = require('./routes/user');
const employeesRouters = require('./routes/employee');

require('./models/user');
require('./models/employee');
require('./models/leave');

const app = express();

app.use(express.json());

app.use('/api/users', usersRouters);
app.use('/api/employees', employeesRouters);

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
