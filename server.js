const express = require('express');
const cors = require('cors');
const router = require('./routes');
const { connect } = require('./config/atlas');

const PORT = 3000;
const app = express();
connect((err) => {
  if (err) return console.log(err);
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(router);

  app.listen(PORT, () => {
    console.log(`Running app on http://localhost:${PORT}`);
  });
  return console.log('Connect');
});
