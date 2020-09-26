const userModel = require('../models/users');
const jwt = require('jsonwebtoken');

module.exports.authenticate = function(req,res,next){
    userModel.findOne({userid:req.body.userid,password:req.body.password}, function(err, userInfo){
       if (err) {
          next(err);
       } else {
           if(userInfo !== null){
               const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1y' });
               res.status(200).send({status:"success", message: "user found!!!", user: userInfo, token:"Bearer " + token});
           }
           else{
               res.status(404).send({status:"not found", message: "Invalid userid or password!!!", user:null});
           }
       }
   });
 }