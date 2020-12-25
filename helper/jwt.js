const jwt = require('jsonwebtoken');

function signToken(payload) {
  const token = jwt.sign(JSON.stringify(payload), process.env.SECREET_KEY || 'secretKey');
  return token;
}

function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.SECREET_KEY || 'secretKey');
  return decoded;
}

module.exports = {
  signToken,
  verifyToken,
};
