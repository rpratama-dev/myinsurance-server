const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const router = require('./routes');
const { connect } = require('./config/atlas');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3000;
const app = express();
connect((err) => {
  if (err) return console.log(err);
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/', router);
  app.use((req, res, next) => {
    next(createError(404, 'Sorry, an error has occured, Requested page not found!'));
  });

  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Running app on http://localhost:${PORT}`);
  });
  return console.log('Connect');
});
