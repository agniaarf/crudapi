var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qwertyuasd123",
  database: "todolistdb"
});

con.connect(function (err){
    if(err){ 
      throw err
    }
    else{
      console.log("Database Connected")
    };
});

module.exports = con;