// const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
var connection = require('../../config/database');

const multer = require("multer");
// Upload Image
const storage = multer.diskStorage({
    destination: "./repo/images/",
    filename: function(req, file, cb) {
      cb(null, "photo-user-" + Date.now() + ".jpg");
    }
  });
  
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("photo");

module.exports.get_all = function(req,res,next){
   connection.query(`SELECT * FROM users ${req.query.id ? "WHERE id="+req.query.id : ""}`, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
         return res.json({
            result: rows,
            message: "Fetch data successfully"
        });
      }
  });
}

// module.exports.read_data = function(req,res,next){
//    userModel.findOne({_id:req.body._id},function(err,result){
//       if(err)
//          next(err);
//       else
//          res.json(result);
//    })
// }
module.exports.create_data = function(req,res,next){
   upload(req, res, err => {

      if (err) {
         next(err);
      } else {
         connection.query(`INSERT INTO users ( id , name , email , userid , password , gender , phone , photo , role  ) 
         VALUES (
            '${req.body.id}',
            '${req.body.name}',
            '${req.body.email}',
            '${req.body.userid}',
            '${req.body.password}',
            '${req.body.gender}',
            '${req.body.phone}',
            '${req.file ? req.file.filename : ""}',
            'admin'
         )`
       ,function(err, result) {
            if (err) 
               next(err);
            else
               res.json({status: "success", message: "User added successfully!!!", data: result});
         });
      }
    });
   
}

module.exports.update_data = function(req,res,next){
   upload(req, res, err => {

      if (err) {
         next(err);
      } else {

         connection.query(`UPDATE users SET 
         name = '${req.body.name}',
         email = '${req.body.email}',
         userid = '${req.body.userid}',
         password = '${req.body.password}',
         gender = '${req.body.gender}',
         phone = '${req.body.phone}',
         photo = '${req.file ? req.file.filename : req.body.photo}',
         role = 'admin'
         WHERE id='${req.params.id}'
         `
       ,function(err, result) {
            if (err) 
               next(err);
            else
               res.json({status: "success", message: "User added successfully!!!", data: result});
         });
      }
    });
   
}



// exports.read_data = function(req, res, next) {
//    userModel.find({_id:req.params._id}, function(err, data) {
//        if (err){
//            next(err);}
//        else{
//            res.json(data);
//        }
//    });
// };



exports.delete_data = function(req, res, next) {
   connection.query(`DELETE FROM users WHERE id='${req.params.id}'`,function(err, data) {
       if (err){
           next(err);}
       else{
           res.json({ message: 'successfully deleted', data : data });
       }
   });
};

