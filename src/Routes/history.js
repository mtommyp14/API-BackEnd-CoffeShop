const express = require('express');

const routes = express.Router();
const ctrl = require('../Controllers/history');

// history/
routes.get('/', ctrl.get);
routes.post('/', ctrl.add);
routes.put('/', ctrl.update);
routes.delete('/:id', ctrl.delete);

module.exports = routes;
