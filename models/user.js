"use strict";
const { hashSync } = require("bcrypt");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post);
    }

    toJSON() {
      const { id, name, email, role, active } = this;
      return {
        id,
        name,
        email,
        role,
        active,
      };
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
          len: {
            args: [3, 50],
            msg: "Name must be 3 - 50 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email is required" },
          isEmail: { msg: "Invalid email" },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Phone is required" },
          isMobilePhone: {
            msg: "Invalid mobile phone",
            locale: "id-ID",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          len: {
            args: [8],
            msg: "Min Password length is 8 characters",
          },
        },
      },
      role: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeSave((instance) => {
    instance.password = hashSync(instance.password, 10);
  });

  return User;
};
