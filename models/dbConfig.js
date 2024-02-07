const { Sequelize } = require("sequelize");

//   create new instance        *db name    *uname     * password
const sequelize = new Sequelize("hostedminds", "root", "parth@123", {
  // This is Object that contains hostname and dialect (database type)
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize
