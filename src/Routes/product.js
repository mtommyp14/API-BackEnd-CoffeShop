const express = require('express');
const routes = express.Router();
const ctrl = require('../Controllers/product');
const validate = require('../Middleware/validate');
const upload = require('../Middleware/multer')
const cache = require('../Middleware/cache')

routes.get('/', 
// validate(["users","admin"]),
 cache, ctrl.get);
 
routes.post('/', 
// upload.single("image"), 
ctrl.add);


routes.put('/',
//  validate(["admin"]), 
 ctrl.update);

routes.delete('/:id',
//  validate(["admin"]), 
 ctrl.delete);

routes.get('/find',
//  validate(["users","admin"]), 
 ctrl.addFind);

routes.get('/search', 
// validate(["users","admin"]),
 ctrl.search);

module.exports = routes;
