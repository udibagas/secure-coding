require("dotenv").config();

const {
  DB_USER_DEV,
  DB_PASS_DEV,
  DB_NAME_DEV,
  DB_HOST_DEV,
  DB_PORT_DEV,
  DB_USER_TEST,
  DB_PASS_TEST,
  DB_NAME_TEST,
  DB_HOST_TEST,
  DB_PORT_TEST,
  DB_USER_PROD,
  DB_PASS_PROD,
  DB_NAME_PROD,
  DB_HOST_PROD,
  DB_PORT_PROD,
} = process.env;

module.exports = {
  development: {
    username: DB_USER_DEV,
    password: DB_PASS_DEV,
    database: DB_NAME_DEV,
    host: DB_HOST_DEV,
    port: DB_PORT_DEV,
    dialect: "postgres",
  },
  test: {
    username: DB_USER_TEST,
    password: DB_PASS_TEST,
    database: DB_NAME_TEST,
    host: DB_HOST_TEST,
    port: DB_PORT_TEST,
    dialect: "postgres",
  },
  production: {
    username: DB_USER_PROD,
    password: DB_PASS_PROD,
    database: DB_NAME_PROD,
    host: DB_HOST_PROD,
    port: DB_PORT_PROD,
    dialect: "postgres",
  },
};
