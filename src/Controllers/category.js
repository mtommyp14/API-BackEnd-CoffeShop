const categories = {};
const model = require('../Models/category');
const respon = require('../Helpers/respon');

categories.get = async (req, res) => {
  try {
    const result = await model.get();
    return respon(res, 200, result);
  } catch (error) {
    return respon(res, 200, error);
  }
};

categories.add = async (req, res) => {
  try {
    const result = await model.addCategories(req.body);
    return respon(res, 201, result);
  } catch (error) {
    return respon(res, 200, error);
  }
};

categories.getID = (req, res) => {
  res.send('Hallo from controller');
};

categories.update = async (req, res) => {
  try {
    const result = await model.updateCategories(req.body);
    return respon(res, 201, result);
  } catch (error) {
    return respon(res, 200, error);
  }
};

categories.delete = async (req, res) => {
  try {
    const result = await model.deleteCategories(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = categories;
