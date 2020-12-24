const createError = require('http-errors');
const { verifyToken } = require('../helper/jwt');
const User = require('../model/User');

async function authentication(req, res, next) {
  const { access_token } = req.headers;
  try {
    if (!access_token) throw createError(401, 'Unauthorize');
    else {
      const decode = verifyToken(access_token);
      const user = await User.findById(decode._id);
      if (!user) throw createError(401, 'Unauthorize');
      else {
        req.userLogedIn = user;
        next();
      }
    }
  } catch (error) {
    console.log('error', error.message);
    next(error);
  }
}

async function authAdmin(req, res, next) {
  const { role } = req.userLogedIn ? req.userLogedIn : { role: null };
  try {
    if (role === 'Admin') {
      next();
    } else {
      throw createError(401, 'Unauthorize');
    }
  } catch (error) {
    next(error);
  }
}

async function authCustomer(req, res, next) {
  const { role } = req.userLogedIn ? req.userLogedIn : { role: null };
  const { id } = req.params;
  const { _id } = req.userLogedIn;
  try {
    console.log(_id, typeof String(_id), typeof id);
    if (role === 'Customer') {
      if (String(_id) === id) {
        next();
      } else {
        throw createError(401, _id);
      }
    } else {
      throw createError(401, _id);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
  authAdmin,
  authCustomer,
};
