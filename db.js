const { Sequelize } = require("sequelize");
require("dotenv").config();

const DB_NAME = process.env.DB_NAME || "railway";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "JwwLvPGxLZpTlUeGgaiSKSrGisClqQKc";
const DB_HOST = process.env.DB_HOST || "mysql.railway.internal";
const DB_PORT = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
