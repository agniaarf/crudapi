const userModel = require('../models/users');
const jwt = require('jsonwebtoken');

const multer = require("multer");
// Upload Image
const storage = multer.diskStorage({
    destination: "./repo",
    filename: function(req, file, cb) {
      cb(null, "BEMFTUBJUSERPHOTO" + file.originalname);
    }
  });
  
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("photo");

module.exports.get_all = function(req,res,next){
   userModel.find({},function(err,result){
      if(err)
         next(err);
      else
          res.json(result);
   })
}

module.exports.read_data = function(req,res,next){
   userModel.findOne({_id:req.body._id},function(err,result){
      if(err)
         next(err);
      else
         res.json(result);
   })
}

module.exports.create_data = function(req,res,next){
   upload(req, res, err => {
      var new_data = req.body;
  
      if (req.file != null) {
         new_data.photo = req.file.filename
      }
      var new_data_user = new userModel(new_data);
      if (err) {
         next(err);
      } else {
         new_data_user.save(function(err, result) {
            if (err) 
               next(err);
            else
               res.json({status: "success", message: "User added successfully!!!", data: result});
         });
      }
    });
   
}



exports.read_data = function(req, res, next) {
   userModel.find({_id:req.params._id}, function(err, data) {
       if (err){
           next(err);}
       else{
           res.json(data);
       }
   });
};


exports.update_data = function(req, res, next) {
   upload(req, res, err => {
      var new_data = req.body;
  
      if (req.file != null) {
        new_data.photo = req.file.filename
      }
      if (err) {
         next(err);
      } else {
         userModel.findOneAndUpdate({_id: req.params._id}, new_data, {new: true}, function(err, data) {
            if (err){
               next(err);}
            else{
               res.json(data);
            }
         });
      }
    });
};

exports.delete_data = function(req, res, next) {
   userModel.remove({
       _id: req.params._id
   }, function(err, data) {
       if (err){
           next(err);}
       else{
           res.json({ message: 'successfully deleted', data : data });
       }
   });
};
