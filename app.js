require('dotenv/config');
const express = require('express');
const cors = require('cors');

const server = express();
const bodyPars = require('body-parser');
const morgan = require('morgan');
const routes = require('./src/main');
const db = require('./src/Configs/db');
const redis = require('./src/Configs/redis');
const logger = require('./src/Configs/winston');

server.use(bodyPars.urlencoded({ extended: false }));
server.use(bodyPars.json());
server.use(morgan('dev'));
server.use(cors());
server.use("/public", express.static("public"))
server.use(routes);

db.connect()
  .then((res) => {
    logger.info('Database Connected');
  })
  .catch((err) => {
    logger.info('Database not Connected');
    logger.info(err);
  });

redis.redisCheck()
  .then(res=>{logger.info(res);})
  .catch(err=>{logger.info(err);})
  
server.listen(9291, () => {
  logger.info('Server Run');
});
