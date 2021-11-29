const Sequelize = require("sequelize");

require("dotenv").config();

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: "localhost",
      // The underlying connector library used by Sequelize for MySQL is the mysql2 npm package (version 1.5.2 or higher).
      dialect: "mysql",
      // Note: You can pass options directly to dialect library by setting the dialectOptions parameter.
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
