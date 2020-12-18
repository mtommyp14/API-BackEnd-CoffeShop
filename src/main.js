const express = require('express');
const routes = express.Router();
const product = require('./Routes/product');
const history = require('./Routes/history');
const category = require('./Routes/category');
const users = require('./Routes/users');
const auth = require('./Routes/auth');
const { cloudinaryConfig } = require('./Configs/cloudinary')

routes.use("*", cloudinaryConfig);
routes.use('/product', product);
routes.use('/history', history);
routes.use('/category', category);
routes.use('/users', users);
routes.use('/auth', auth);


module.exports = routes;
