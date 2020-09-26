var connection = require('../../config/database');
const jwt = require('jsonwebtoken');

module.exports.authenticate = function(req,res,next){
    // console.log("req.body.userid",req.body.userid)
    connection.query(`SELECT * FROM users WHERE userid='${req.body.userid}'`, function(err, userInfo){
        // console.log("userinfo",userInfo)
       if (err) {
          next(err);
          res.status(404).send({status:"not found", message: "Invalid userid", user:null});
       } else {
           if(userInfo.length > 0){
            //    console.log("userinfo",userInfo)
               if(userInfo[0].password === req.body.password){
                   const token = jwt.sign({id: userInfo[0]._id}, req.app.get('secretKey'), { expiresIn: '1y' });
                   res.status(200).send({status:"success", message: "user found!!!", user: userInfo[0], token:"Bearer " + token});
               }
               else{
                   res.status(404).send({status:"not found", message: "Invalid password", user:null});
               }
           }
           else{
               res.status(404).send({status:"not found", message: "Invalid userid", user:null});
           }
       }
   });
 }