const { Game } = require('../models');  // Import the Game model

// Get all games
const getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    return res.json(games);
  } catch (err) {
    console.error('Error retrieving games:', err);
    return res.status(500).json({ message: 'Error retrieving games', error: err });
  }
};

// Create a new game
const createGame = async (req, res) => {
  try {
    const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = req.body;
    const game = await Game.create({ publisherId, name, platform, storeId, bundleId, appVersion, isPublished });
    return res.status(200).json(game);  // Respond with the created game and 200 status
  } catch (err) {
    console.error('Error creating game:', err);
    return res.status(400).json({ message: 'Error creating game', error: err });
  }
};

// Update an existing game
const updateGame = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = req.body;
    await game.update({ publisherId, name, platform, storeId, bundleId, appVersion, isPublished });
    return res.json(game);  // Return the updated game
  } catch (err) {
    console.error('Error updating game:', err);
    return res.status(500).json({ message: 'Error updating game', error: err });
  }
};

// Delete a game
const deleteGame = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    await game.destroy();
    return res.status(200).json({ message: 'Game deleted successfully' });
  } catch (err) {
    console.error('Error deleting game:', err);
    return res.status(500).json({ message: 'Error deleting game', error: err });
  }
};

module.exports = {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
};
