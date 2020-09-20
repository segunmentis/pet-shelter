 const mysql = require("mysql");
 const dbConfig = require("../config/db.config");

 //create a connection to the database
 const conn = mysql.createConnection({
     host: dbConfig.HOST,
     user: dbConfig.USER,
     password: dbConfig.PASSWORD,
     database: dbConfig.DB,
 });

 //open MySql connection
 conn.connect((error) => {
     if(error) throw error;
     console.log("Connected");
 });

 module.exports = conn;