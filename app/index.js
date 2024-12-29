const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// Removed: const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const { sequelize } = require('./models');

// Removed: dotenv.config();

const app = express();
const { PORT } = process.env; // Relying on config/config.js to set PORT

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Serve static files from the 'static' folder
app.use(express.static(path.join(__dirname, '../static'))); // Updated path

// Use API routes
app.use('/api', apiRoutes);

// Handle root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../static', 'index.html')); // Updated path
});

// Authenticate and sync database
sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
