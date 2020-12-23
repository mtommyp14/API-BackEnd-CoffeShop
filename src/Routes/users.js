const express = require('express');
const routes = express.Router();
const ctrl = require('../Controllers/users');
const validate = require('../Middleware/validate')

routes.get('/', 
// validate(["admin"]), 
ctrl.getAll);

routes.post('/', 
// validate(["admin"]), 
ctrl.add);

routes.put('/', 
// validate(["users","admin"]),
ctrl.updateUser);

routes.delete('/:id', 
// validate(["admin"]), 
ctrl.deleteUser);


module.exports = routes;
