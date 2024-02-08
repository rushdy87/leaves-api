const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  // Its a browser behavior for creating HTTP request
  // basically anything but get request, The browser automaticlly
  // send 'OPTIONS' request before it send the actual request you
  // went to send
  if (req.method === 'OPTIONS') {
    return next();
  }
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

// NOTES about auth in front-end:
// 1. The login api response with object contain {userId, username, role,token}
// 2. We can implement a (login/logout) function depend on the token.
// if there is token login, if not logout..
// 3. We can use the token to (or role?!) to determine what should RENDER.
// 4. it's important to save a token, for anothe requests.
// 5. When sending a request, add an "authorization" and set it to `Bearer ${token}` to header of request.
