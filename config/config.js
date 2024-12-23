const path = require('path');
const dotenv = require('dotenv');

// Fallback for NODE_ENV if it's undefined
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Explicitly load the correct .env file based on NODE_ENV
let envFile;
if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production';
} else if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
} else {
  envFile = '.env.development';
}

dotenv.config({ path: path.resolve(__dirname, '..', envFile) });

console.log(`Loading environment file: ${envFile}`);
console.log(`NODE_ENV is set to: ${process.env.NODE_ENV}`);

module.exports = {
  development: {
    username: process.env.DB_USERNAME || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'database.sqlite3',
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../', process.env.DB_NAME || 'database.sqlite3'),
    logging: console.log,
  },
  test: {
    username: process.env.DB_USERNAME || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'database_test.sqlite3',
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../', process.env.DB_NAME || 'database_test.sqlite3'),
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || null,
    host: process.env.DB_HOST || 80,
    dialect: 'postgres' || null,
    logging: false,
  },
};
