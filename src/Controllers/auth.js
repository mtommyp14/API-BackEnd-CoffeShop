const bcr = require('bcrypt');
const model = require('../Models/users')
const respon = require('../Helpers/respon')
const jwt = require('jsonwebtoken');
const logger = require('../Configs/winston');

class Auth {
    login = async (req, res) => {
        try {
            const passDB = await model.getDataByEmail(req.body.email)
            const passUser = req.body.password

            if(passDB.length <= 0){
                logger.info("Post data email salah", passDB)
                return respon(res, 200, {msg: "Email anda tidak terdaftar"})
            }

            const cek = await bcr.compare(passUser, passDB[0].password)
            if (cek) {  
                const result = await this.setToken(passDB[0].email, passDB[0].role)
                logger.info("Post data berhasil, data cocok")
                return respon(res, 200, result)
            } else {
                logger.info("Post data error Email benar dan password salah", cek)
                return respon(res, 200, {
                    msg: "Check Password Anda"
                })
            }
        } catch (error) {
            logger.warn("Error from login Auth", error);
            return respon(res, 500, error)
        }
    }

    

    setToken = async(email, role) =>{
        try {
            const payload ={
                email: email,
                role: role, 
            }
            const token = jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: '1h'})

            const result ={
                msg: "Token Created",
                token: token
            }
            logger.info("Token has created", result)
            return result
        } catch (error) {
            logger.info("Token was error from setToken" ,error)
            throw error
        }
    }
}

module.exports = new Auth()