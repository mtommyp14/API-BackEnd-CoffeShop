const express = require('express');
const routes = express.Router();
const ctrl = require('../Controllers/users');
const validate = require('../Middleware/validate')

// product/
routes.get('/', validate(["admin"]), ctrl.getAll);
routes.post('/', ctrl.add);

module.exports = routes;
