const { Model, DataTypes } = require("sequelize");

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        idclient: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },

        full_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Please fill in the Description field!",
            },
            notNull: {
              msg: "Please fill in the Description field!",
            },
            len: {
              args: [0, 255],
              msg: "The Description field must have a maximum of 50 character(s).",
            },
          },
        },

        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Please fill in the Description field!",
            },
            notNull: {
              msg: "Please fill in the Description field!",
            },
            len: {
              args: [0, 50],
              msg: "The Description field must have a maximum of 50 character(s).",
            },
          },
        },

        birth_date: {
          type: DataTypes.DATE,
        },

        cpf: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "client",
      }
    );
  }
}

module.exports = Client;
