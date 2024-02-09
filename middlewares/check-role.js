const { handleErrors } = require('./error-handling');
const { ROLE } = require('../util/roles');

module.exports =
  (requiredRole = ROLE.BASIC) =>
  (req, res, next) => {
    try {
      const userRole = +req.userData.role;

      if (userRole === ROLE.ADMIN || userRole === requiredRole) {
        return next();
      }

      const error = handleErrors(
        "Access not allowed, you don't have the required permission",
        401
      );
      next(error);
    } catch (error) {
      next(handleErrors('There is an error', 500));
    }
  };
