const { ROLE } = require('../util/roles');
const HttpError = require('../models/http-error');

module.exports =
  (requiredRole = ROLE.BASIC) =>
  (req, res, next) => {
    try {
      const userRole = +req.userData.role;

      if (userRole === ROLE.ADMIN) {
        return next();
      }

      if (userRole !== requiredRole) {
        const error = new HttpError(
          "Access not allowed, you don't have the required permission",
          401
        );
        return next(error);
      }

      return next();
    } catch (error) {
      next(new HttpError('There is an error', 500));
    }
  };
