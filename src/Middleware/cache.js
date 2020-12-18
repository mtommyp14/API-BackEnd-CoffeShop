const respon = require('../Helpers/respon')
const redis = require('../Configs/redis')

const getAll = (req,res,next)=>{
    redis.redisdb.get("products", (err,data)=>{
        if(err){
            return respon (res, 200, result)
        }

        if(data !== null){
            const result = JSON.parse(data)
            console.log("dari Redis");
            return respon(res, 200, result)
        }else{
            next()
        }
    })
}

module.exports = getAll