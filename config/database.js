require('dotenv').config();
const path = require('path');

const DB_TEST_PATH = path.join(__dirname, '../db/testing.sqlite');

const {
  DB_USER = 'postgres',
  DB_PASSWORD = 'admin',
  DB_NAME = 'binarcar',
  DB_HOST = '127.0.0.1',
  DB_PORT = '5432',
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: 'admin',
    database: 'binarcar_development',
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres',
    ssl: true,
  },
  test: {
    storage: DB_TEST_PATH,
    logging: false,
    dialect: 'sqlite',
  },
  production: {
    username: DB_USER,
    database_url: 'postgresql://postgres:QkLueXl5hVwDArxxMLgp@containers-us-west-114.railway.app:7072/railway',
    password: 'QkLueXl5hVwDArxxMLgp',
    database: 'railway',
    host: 'containers-us-west-114.railway.app',
    port: '7072',
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
