"use strict";
const { Model } = require("sequelize");
const { escapeHTML } = require("../helpers/escapeHtml");
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

  // Prevent CSS (sanitize input)
  // Post.beforeCreate((instance) => {
  //   instance.body = escapeHTML(instance.body);
  // });

  return Post;
};
