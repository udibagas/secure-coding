"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User);
    }
  }
  Post.init(
    {
      UserId: DataTypes.INTEGER,
      body: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
