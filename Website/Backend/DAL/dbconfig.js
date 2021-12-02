'use strict';

const mysql = require('mysql');

//local mysql db connection

const dbConn = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'alarmproject'
});

module.exports = dbConn;