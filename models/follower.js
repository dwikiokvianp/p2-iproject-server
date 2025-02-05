"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Follower.belongsTo(models.User, { foreignKey: "UserId" });
      Follower.belongsTo(models.User, { foreignKey: "TargetId" });
    }
  }

  Follower.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
        },
      },
      TargetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
        },
      },
    },
    {
      sequelize,
      modelName: "Follower",
    }
  );
  return Follower;
};
