"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserContent.belongsTo(models.User, { foreignKey: "UserId" });
      UserContent.belongsTo(models.Content, { foreignKey: "ContentId" });
    }
  }

  UserContent.init(
    {
      ContentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Contents",
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserContent",
    }
  );
  return UserContent;
};
