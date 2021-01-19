const express = require('express');
const validate = require('../Middleware/validate');

const routes = express.Router();
const ctrl = require('../Controllers/category');

routes.get('/', 
// validate(["admin"]), 
 ctrl.get);

routes.post('/', 
//  validate(["admin"]),
  ctrl.add);

routes.put('/', 
//  validate(["admin"]), 
 ctrl.update);

routes.delete('/:id',
//  validate(["admin"]), 
 ctrl.delete);

module.exports = routes;
