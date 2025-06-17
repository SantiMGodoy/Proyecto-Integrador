const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbName = process.env.DB_NAME || "sistema_hospitalario";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "";
const dbHost = process.env.DB_HOST || "mysql.railway.internal"; // Host para Railway
const dbPort = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;