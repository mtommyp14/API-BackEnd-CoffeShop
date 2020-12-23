const multer = require('multer');

const storages = multer.diskStorage({
    destination: "public/upload",
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString() + "-" + file.originalname)
      
    }
})

const filter = (req, file, cb)=>{
    console.log("masuk");
    if(file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
        console.log("masuk if");
        cb(null, true)
    }else{
        console.log("masuk else");
        cb(null, false)
    }
}



const upload = multer({
    storage: storages,
    fileFilter: filter

})


module.exports = upload