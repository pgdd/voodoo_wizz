const express = require('express');
const {
  createGame,
  getGame,
  updateGame,
  deleteGame,
  getAllGames,
} = require('../controllers/gamesController');

const router = express.Router();

// Define routes for games resource
router.post('/', createGame);
router.get('/:id', getGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);
router.get('/', getAllGames);

module.exports = router;
