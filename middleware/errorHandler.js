function errorHandler(err, req, res, next) {
  console.log('disini');
  const status = err.status || 500;
  const response = err.message || 'Internal Server Error';
  console.log('status', status, response);
  res.status(status).json({ status, response });

  res.status(err.status).json({ message: err.message });
}

module.exports = errorHandler;
