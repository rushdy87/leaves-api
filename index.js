const express = require('express');
require('dotenv').config();

const sequelize = require('./util/database');

const usersRouters = require('./routes/user');
const employeesRouters = require('./routes/employee');
const leavesRouters = require('./routes/leave');

const { handleErrors } = require('./middlewares/error-handling');
const { unsupportedRoutes } = require('./middlewares/unsupported-routes');

// require('./models/user');
// require('./models/employee');
// require('./models/leave');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use(express.json());

app.use('/api/users', usersRouters);
app.use('/api/employees', employeesRouters);
app.use('/api/leaves', leavesRouters);

// UnsupportedRoutes
app.use(unsupportedRoutes);

// Handling Errors
app.use(handleErrors);

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
