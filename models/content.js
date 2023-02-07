"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Content.belongsTo(models.Topic, { foreignKey: "TopicId" });
      Content.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }

  Content.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title is required",
          },
          notNull: {
            msg: "Title is required",
          },
        },
      },
      contentFill: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Content is required",
          },
          notNull: {
            msg: "Content is required",
          },
        },
      },
      contentType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Content type is required",
          },
          notNull: {
            msg: "Content type is required",
          },
        },
      },
      TopicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Topic is required",
          },
          notNull: {
            msg: "Topic is required",
          },
        },
        references: {
          model: "Topics",
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User is required",
          },
          notNull: {
            msg: "User is required",
          },
        },
        references: {
          model: "Users",
        },
      },
    },
    {
      sequelize,
      modelName: "Content",
    }
  );
  return Content;
};
