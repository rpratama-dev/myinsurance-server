const jwt = require('jsonwebtoken');

function signToken(payload) {
  const token = jwt.sign(JSON.stringify(payload), 'secretKey');
  return token;
}

function verifyToken(token) {
  const decoded = jwt.verify(token, 'secretKey');
  return decoded;
}

module.exports = {
  signToken,
  verifyToken,
};
