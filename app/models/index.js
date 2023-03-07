const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV]?.url,
 {
    dialect: "postgres",
    ...dbConfig[process.env.NODE_ENV]?.options
}

);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./new.model.js")(sequelize, Sequelize);

module.exports = db;