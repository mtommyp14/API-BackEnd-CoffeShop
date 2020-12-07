/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv/config');
const express = require('express');

const server = express();
const bodyPars = require('body-parser');
const morgan = require('morgan');
const routes = require('./src/main');
const db = require('./src/Configs/db');

server.use(bodyPars.urlencoded({ extended: false }));
server.use(bodyPars.json());
server.use(morgan('dev'));
server.use(routes);

db.connect()
  .then((res) => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log('Database not Connected');
    console.log(err);
  });

server.listen(3000, () => {
  console.log('Server Run');
});
