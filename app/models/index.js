const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/config'); // Correct path to config.js

// Ensure NODE_ENV is set, if it's not, throw an error
if (!process.env.NODE_ENV) {
  throw new Error('Environment variable NODE_ENV is not defined in the .env file');
}

const env = process.env.NODE_ENV; // No fallback value

// Ensure the configuration for the environment is properly loaded
const configEnv = config[env];
if (!configEnv) {
  throw new Error(`Database configuration for environment ${env} is missing in config.js`);
}

// Ensure all required environment variables are defined
const requiredConfigKeys = ['database', 'username', 'password', 'dialect', 'storage'];
requiredConfigKeys.forEach(key => {
  if (!configEnv[key]) {
    throw new Error(`Environment variable ${key} is missing in the .env or config.js`);
  }
});

// Set up Sequelize instance with environment-specific configurations
const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
  host: configEnv.host, // No fallback, needs to be set in config
  dialect: configEnv.dialect,
  storage: configEnv.storage, // Must be defined for SQLite
  logging: configEnv.logging, // Logging based on the config
});

// Dynamically import models
const db = {};
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js') // Exclude index.js
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Add each model to the db object
  });

// Attach Sequelize instance and Sequelize library to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Return the db object with all the models
module.exports = db;
