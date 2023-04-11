const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");
const modelsIndex = require("./modelsIndex");

const connection = new Sequelize(dbConfig());

modelsIndex.map((model) => model.init(connection));
modelsIndex.map(
  (model) => model.associate && model.associate(connection.models)
);

module.exports = connection;
