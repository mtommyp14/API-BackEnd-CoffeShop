const express = require('express');

const routes = express.Router();
const ctrl = require('../Controllers/auth');

routes.post('/',
// validate(["admin","users"]),
ctrl.login);

module.exports = routes;
