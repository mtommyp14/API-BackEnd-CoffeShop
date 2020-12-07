const express = require('express');

const routes = express.Router();
const ctrl = require('../Controllers/product');

// product/
routes.get('/', ctrl.get);
routes.post('/', ctrl.add);
routes.put('/', ctrl.update);
routes.delete('/:id', ctrl.delete);
routes.get('/find', ctrl.addFind);
routes.get('/search', ctrl.search);

module.exports = routes;
