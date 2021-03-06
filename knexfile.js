// Knex configuration
const path = require("path");
require("dotenv").config();

// Enviornment Variable handling
const {
  DATABASE_HOST,
  DATABASE_USER_DEVELOPMENT,
  DATABASE_PASSWORD_DEVELOPMENT,
  DATABASE_USER_PRODUCTION,
  DATABASE_PASSWORD_PRODUCTION
} = process.env;

// Config and export
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: DATABASE_HOST,
      user: DATABASE_USER_DEVELOPMENT,
      database: DATABASE_USER_DEVELOPMENT,
      password: DATABASE_PASSWORD_DEVELOPMENT,
      charset: 'utf8'
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: DATABASE_HOST,
      user: DATABASE_USER_PRODUCTION,
      database: DATABASE_USER_PRODUCTION,
      password: DATABASE_PASSWORD_PRODUCTION,
      charset: 'utf8'
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    }
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    },
    useNullAsDefault: true,
  }
};
