const path = require('path');
const dotenv = require('dotenv');

// Ensure NODE_ENV is set before loading environment variables
if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is not defined. Please set it before running.');
}

// Load environment variables from the appropriate .env file based on NODE_ENV
const envFile = path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`);
dotenv.config({ path: envFile });

// Destructure environment variables for easy access
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_DIALECT, DB_HOST, DB_PORT, NODE_ENV } = process.env;

// Ensure all required environment variables are available
if (!DB_USERNAME || !DB_PASSWORD || !DB_NAME || !DB_DIALECT || !NODE_ENV) {
  throw new Error('Missing required environment variables: DB_USERNAME, DB_PASSWORD, DB_NAME, DB_DIALECT, or NODE_ENV');
}

// Set storage path for SQLite or use host for other databases
const storage = DB_DIALECT === 'sqlite' ? path.resolve(__dirname, '../database/storage', DB_NAME) : null;
const host = DB_DIALECT !== 'sqlite' ? DB_HOST : null; // Use DB_HOST only for other databases
// Common environment configuration to be reused
const commonEnv = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  dialect: DB_DIALECT,
  storage, // Will be used only for SQLite
  host, // Will be used for other DBs like PostgreSQL
  port: DB_PORT,
};

module.exports = {
  development: {
    ...commonEnv,
    logging: console.log, // Debug logging for development
  },
  test: {
    ...commonEnv,
    logging: false, // No logging for tests
  },
  production: {
    ...commonEnv,
    host: DB_HOST, // DB_HOST defined in .env for production
    logging: false, // No logging for production
  },
};
