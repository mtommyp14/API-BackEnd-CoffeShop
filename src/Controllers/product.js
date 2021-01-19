const products = {};
const model = require('../Models/product');
const respon = require('../Helpers/respon');
const cloudUpload = require('../Helpers/cloudUpload');
const redis = require('../Configs/redis');
const { redisdb } = require('../Configs/redis');
const logger = require('../Configs/winston');

products.get = async (req, res) => {
  try {
    const result = await model.get();
    const saveRedis = JSON.stringify(result)
    redisdb.setex("products", 60, saveRedis)
    console.log("dari PostGres");
    logger.info('Get data process', res);
    return respon(res, 200, result);
  } catch (error) {
    logger.error(error)
    return respon(res, 200, error);
  }
};


products.add = async (req, res) => {
  try {
    logger.info(req);
    if(req.file === undefined){
      return respon(res, 500, {msg: "Image harus diisi"})
    }
    const image_url = await cloudUpload(req.file.path)
    const result = await model.addProduct(req.body, image_url)
    redisdb.del("products")
    return respon(res, 201, result);
  } catch (error) {
    logger.error(error)
    return respon(res, 200, error);
  }
};

products.update = async (req, res) => {
  // console.log("masuk");
  try {
    if(req.file === undefined){
      // console.log("masuk try if");
      return respon(res, 500, {msg: "Image harus diisi"})
    }
    const image_url = await cloudUpload(req.file.path)
    const result = await model.updateProduct(req.body, image_url);
    redisdb.del("products")
    return respon(res, 201, result);
  } catch (error) {
    // logger.error(error)
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
    logger.error(error)
    return respon(res, 200, error);
  }
};

products.search = async (req, res) => {
  try {
    const result = await model.search(req.query.search);
    return respon(res, 200, result);
  } catch (error) {
    logger.error(error)
    return respon(res, 200, error);
  }
};


products.delete = async (req, res) => {
  try {
    const result = await model.deleteProduct(req.params.id);
    redisdb.del("products")
    return respon(res, 201, result);
  } catch (error) {
    logger.error(error)
    return respon(res, 200, error);
  }
};

module.exports = products;
