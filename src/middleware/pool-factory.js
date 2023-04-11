const mysql = require("mysql2");
const configMysql = require("../config/dbconnect_mysql");

const poolMysql = mysql.createPool(configMysql());
