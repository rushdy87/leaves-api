const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // {authorization: 'Bearer TOKEN'}

    if (!token) {
      throw new Error('Authentication faild!');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY); // return { userId, username }
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication faild!', 403);
    return next(error);
  }
};

//req.headers is automaticlly provided by 'express', it's a js object