const express = require('express');
const validate = require('../Middleware/validate');

const routes = express.Router();
const ctrl = require('../Controllers/history');

routes.get('/', 
// validate(["users","admin"]), 
ctrl.get);

routes.post('/', 
// validate(["users","admin"]), 
ctrl.add);

routes.put('/', 
// validate(["users","admin"]), 
ctrl.update);

routes.delete('/:id', 
// validate(["users","admin"]), 
ctrl.delete);

module.exports = routes;
