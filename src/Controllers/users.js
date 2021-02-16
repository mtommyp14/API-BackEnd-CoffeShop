/* eslint-disable class-methods-use-this */
const model = require('../Models/users');
const respon = require('../Helpers/respon');
const hashPassword = require('../Helpers/hash');
const { log } = require('winston');

class Users {
  async add(req, res) {
    try {
      const check = model.getDataByEmail(req.body.email);
      if (check.length > 0) {
        return respon(res, 401, { msg: 'Email Sudah terdaftar' });
      }

      const newPassword = await hashPassword(req.body.password);
      const users = {
        email: req.body.email,
        name: req.body.name,
        password: newPassword,
        role: req.body.role,
      };
      const data = await model.add(users);
      return respon(res, 200, data);
    } catch (error) {
      return respon(res, 500, error);
    }
  };

  async getAll(req, res) {
    try {
      const result = await model.getAllData();
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 500, error);
    }
  };

  async updateUser(req, res){
    try {
      const result = await model.updateUsers(req.body);
      return respon(res, 200, result)
    } catch (error) {
      return respon(res, 500, error)
    }
  };

  async deleteUser(req, res){
    try {
      const result = await model.deleteUsers(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json(error);
    }
  }
}

module.exports = new Users();
