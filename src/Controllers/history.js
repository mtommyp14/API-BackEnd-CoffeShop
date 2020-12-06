const histories = {};
const model = require('../Models/history');
const respon = require('../Helpers/respon');

histories.get = async (req, res) => {
  try {
    const result = await model.get();
    return respon(res, 200, result);
  } catch (error) {
    return respon(res, 200, error);
  }
};

histories.add = async (req, res) => {
  try {
    const result = await model.addHistories(req.body);
    return respon(res, 201, result);
  } catch (error) {
    return respon(res, 200, error);
  }
};

histories.getID = (req, res) => {
  res.send('Hallo from controller');
};

histories.update = async (req, res) => {
  try {
    const result = await model.updateHistories(req.body);
    return respon(res, 201, result);
  } catch (error) {
    return respon(res, 200, error);
  }
};

histories.delete = async (req, res) => {
  try {
    const result = await model.deleteHistories(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = histories;
