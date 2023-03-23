const kategoriModel = require('../models/kategori');
const jwt = require('jsonwebtoken');
// var connection = require('../../config/database');

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
   kategoriModel.find({},function(err,result){
      if(err)
         next(err)
      else {
         res.json(result);
      }
   })
}

module.exports.read_data = function(req,res,next){
   kategoriModel.findOne({_id:req.body._id},function(err,result){
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
      var new_data_user = new kategoriModel(new_data);
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
   kategoriModel.find({_id:req.params._id}, function(err, data) {
       if (err){
           next(err);}
       else{
           res.json(data);
       }
   });
};


exports.update_data = function(req, res, next) {
   // // upload(req, res, err => {
   //    var new_data = req.body;
  
   //    // if (req.file != null) {
   //    //   new_data.photo = req.file.filename
   //    // }
   //    // if (err) {
   //    //    next(err);
   //    // } else {
         kategoriModel.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, function(err, data) {
            if (err){
               next(err);
               }
            else{
               res.json(data);
            }
         });
      // }
   //  });
};

exports.delete_data = function(req, res, next) {
   kategoriModel.deleteOne({
       _id: req.params._id
   }, function(err, data) {
       if (err){
           next(err);}
       else{
           res.json({ message: 'successfully deleted', data : data });
       }
   });
};

