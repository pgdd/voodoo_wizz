const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  // For resolving file paths
const apiRoutes = require('./routes/api');
const { sequelize } = require('./models');  // Ensure sequelize is exported from models/index.js

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());  // Use middleware to parse JSON bodies

// Serve static files from the 'static' folder
app.use(express.static(path.join('static')));  // Add this line to serve static files

// Use API routes
app.use('/api', apiRoutes);

// Optionally, handle the root route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join('static', 'index.html')); 
});

if (process.env.NODE_ENV !== 'test') {
  sequelize.authenticate()
    .then(() => {
      console.log('Database connected.');
      return sequelize.sync(); // Ensure all models are synced
    })
    .then(() => {
      app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
}

module.exports = app;
