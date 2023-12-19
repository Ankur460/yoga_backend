var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'db4free.net',
  user     : 'ankur46',
  password : 'Ankur@1234',
  database : 'yoga_app'
});
 
connection.connect((err)=>{
    if(err) throw err
    console.log("DataBase Connected");
});

module.exports=connection;