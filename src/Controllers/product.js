const products = {};
const model = require('../Models/product');
const respon = require('../Helpers/respon');

products.get = async (req, res) => {
  try {
    const result = await model.get();
    return respon(res, 200, result);
  } catch (error) {
    return respon(res, 200, error);
  }
};

products.add = async (req, res) => {
  try {
    const result = await model.addProduct(req.body);
    return respon(res, 201, result);
  } catch (error) {
    return respon(res, 200, error);
  }
};

products.addFind = async (req, res) => {
  try {
    const {
      orderby, sort,
    } = req.query;
    const result = await model.addFind(orderby, sort);
    return respon(res, 201, result);
  } catch (error) {
    return respon(res, 200, error);
  }
};

products.search = async (req, res) => {
  // console.log(req.query);
  try {
    const result = await model.search(req.query.search);
    return respon(res, 200, result);
  } catch (error) {
    return respon(res, 200, error);
  }
};

products.update = async (req, res) => {
  try {
    const result = await model.updateProduct(req.body);
    return respon(res, 201, result);
  } catch (error) {
    return respon(res, 200, error);
  }
};

products.delete = async (req, res) => {
  try {
    const result = await model.deleteProduct(req.params.id);
    return respon(res, 201, result);
  } catch (error) {
    return respon(res, 200, error);
  }
};

module.exports = products;
