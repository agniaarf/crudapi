const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const app = express();

// Body parser middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('secretKey', 'nodeRestApi');

//Cross Origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));

// register route private
const private_users = require('./api/routes/private/users');

//register router public
const public_auth = require('./api/routes/public/auth');

// private route
app.use('/private/users',validateUser, private_users);

// public route
app.use('/auth', public_auth);
//repo image
app.use("/repo", express.static(path.join(__dirname, 'repo')));


// validate user jwt
function validateUser(req, res, next) { 
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.status(401).send({status:"error", message: "Sorry you aren't allowed to access this API ^_^", data:null});
    }
    else {
      req.body.userId = decoded.id;
      next();
    }
  });
}

var server_http = require('http').createServer(app);

const port_http = process.env.PORT || 4300;

server_http.listen(port_http, ()=>{
  console.log(`Http Server running on port ${port_http}`);
})
//ini adalah endpoint yg memriksa client terhubung dengan server atau tidak
app.get('/', function (req, res) { 
  // console.log('someone is checking')  
  res.send('OK Server BEM FT UBHARA is Running')
})