const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Removed the .js extension
const config = require('../../config/config')[process.env.NODE_ENV || 'development'];

const db = {};

// Establish Sequelize connection
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Read all model files
const modelFiles = fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js' && file.endsWith('.js'));

modelFiles.forEach((file) => {
  // Disable specific ESLint rules for dynamic require
  /* eslint-disable import/no-dynamic-require, global-require */
  const model = require(path.resolve(__dirname, file))(sequelize, Sequelize.DataTypes);
  /* eslint-enable import/no-dynamic-require, global-require */
  db[model.name] = model;
});

// Set up associations if defined in models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
