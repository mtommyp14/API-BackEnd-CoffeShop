const express = require('express');
const routes = express.Router();
const product = require('./Routes/product');
const history = require('./Routes/history');
const category = require('./Routes/category');
const users = require('./Routes/users');
const auth = require('./Routes/auth');
const { cloudinaryConfig } = require('./Configs/cloudinary')

routes.use("/api/*", cloudinaryConfig);
routes.use('/api/product', product);
routes.use('/api/history', history);
routes.use('/api/category', category);
routes.use('/api/users', users);
routes.use('/api/auth', auth);


module.exports = routes;
