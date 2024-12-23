const express = require('express');
const {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
} = require('../controllers/gamesController');

const router = express.Router();

// Define routes for games resource
router.get('/', getAllGames);
router.post('/', createGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);


module.exports = router;
