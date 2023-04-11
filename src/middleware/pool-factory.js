const mysql = require("mysql2");
const configMysql = require("../config/dbconnect_mysql");

const poolMysql = mysql.createPool(configMysql());

process.on("SIGINT", () => {
  poolMysql.end((err) => {
    if (err) return;
    process.exit(0);
  });
});

module.exports = poolMysql;
