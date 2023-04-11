require("dotenv").config();

module.exports = function db() {
  const connect = {
    username: process.env.DBUSERNAME_SEQUELIZE,
    password: process.env.DBPASSWORD_SEQUELIZE,
    database: process.env.DBDATABASE,
    port: process.env.DBPORT,
    host: process.env.DBHOST,
    dialect: "mysql",
    dialectOptions: {
      decimalNumbers: true,
      multipleStatements: true,
      charset: "utf8mb4_0900_ai_ci",
    },
    timezone: "-03:00",
    pool: {
      max: parseInt(process.env.DBPOOLMAX, 10),
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false,
    },
    logging: false,
  };
  return connect;
};
