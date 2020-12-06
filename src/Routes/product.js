const express = require('express');

const routes = express.Router();
const ctrl = require('../Controllers/product');

// product/
routes.get('/', ctrl.get);
routes.post('/', ctrl.add);
routes.put('/', ctrl.update);
routes.delete('/:id', ctrl.delete);
routes.get('/find', ctrl.addFind);

module.exports = routes;
