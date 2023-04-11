require("dotenv").config();

module.exports = function db() {
  const connect = {
    host: process.env.DBHOST,
    user: process.env.DBUSERNAME,
    port: process.env.DBPORT,
    password: process.env.DBPASSWORD,
    connectionLimit: parseInt(process.env.DBPOOLMAX, 10),
    waitForConnections: true,
    charset: "utf8mb4_0900_ai_ci",
    database: process.env.DBDATABASE,
    queueLimit: 0,
    multipleStatements: true,
    connectTimeout: 10000,
    timezone: "-03:00",
  };
  return connect;
};
