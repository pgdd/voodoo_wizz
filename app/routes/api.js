const express = require('express');
const gamesRoutes = require('./games');

const router = express.Router();

router.use('/games', gamesRoutes);

module.exports = router;
