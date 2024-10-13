// Local Files Storage
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,path.join(__dirname,"../uploads/"))
//     },
//     filename:function(req,file,cb){
//         const uniqueSuffix = Date.now() + "_" + Math.round(Math.random())
//         cb(null,`${uniqueSuffix}-${file.originalname}`)

//     }
// })

// exports.upload = multer({storage:storage})

// On Cloudary Storage
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random());
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

exports.upload = multer({ storage: storage });
