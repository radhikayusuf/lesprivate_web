var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "DB_TEST"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;