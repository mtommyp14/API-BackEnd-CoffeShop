const express = require('express');

const routes = express.Router();
const ctrl = require('../Controllers/category');

// product/
routes.get('/', ctrl.get);
routes.post('/', ctrl.add);
routes.put('/', ctrl.update);
routes.delete('/:id', ctrl.delete);

module.exports = routes;
