const knex = require("knex");

const database = knex({
  client: "pg", // pg is the database driver for postgreSQL on knexjs
  connection: {
    host: process.env.DB_HOST, // Your local host IP
    user: process.env.DB_USER, // Your postgres user name
    password: process.env.DB_PASSWORD, // Your postrgres user password
    database: process.env.DB_NAME // Your database name
  }
});

module.exports = database;