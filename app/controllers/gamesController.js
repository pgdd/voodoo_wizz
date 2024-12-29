const { Game } = require('../models'); // Import Game model

// Create a new game
const createGame = async (req, res) => {
  const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = req.body;

  // Log the incoming request body for debugging
  console.log('Incoming request body:', req.body);

  // Validate required fields
  if (!name || !platform || !storeId || !appVersion) {
    return res.status(400).json({
      message: 'Validation error: name, platform, storeId and appVersion are required.',
    });
  }

  // Ensure isPublished is a boolean
  if (typeof isPublished !== 'boolean') {
    return res.status(400).json({
      message: 'Validation error: "isPublished" must be a boolean.',
    });
  }

  try {
    // Check if a game with the same name, platform, storeId, and appVersion already exists
    const existingGame = await Game.findOne({
      where: { name, platform, storeId, appVersion },
    });

    // Log the result of the find query for debugging
    console.log('Existing Game:', existingGame);

    // If a duplicate game is found
    if (existingGame) {
      return res.status(400).json({
        message: 'A game with a name platform storeId and or appVersion already exists.',
      });
    }
    // If no duplicate is found, create the new game
    const newGame = await Game.create({
      publisherId, name, platform, storeId, bundleId, appVersion, isPublished,
    });

    // Respond with the created game and a 201 status
    return res.status(201).json(newGame);
  } catch (err) {
    console.error('Error creating game:', err);
    return res.status(500).json({ message: 'Error creating game', error: err });
  }
};

// Get a game by ID
const getGame = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Validate the game ID format
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    return res.json(game); // Return the found game
  } catch (err) {
    console.error('Error retrieving game:', err);
    return res.status(500).json({ message: 'Error retrieving game', error: err });
  }
};

// Update an existing game
const updateGame = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Validate the game ID format
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const game = await Game.findByPk(id);

    // If the game is not found, return a "Game not found" message
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = req.body;

    // Validate required fields
    if (!name || !platform || !storeId || !appVersion) {
      return res.status(400).json({
        message: 'Validation error: name, platform, storeId and appVersion are required.',
      });
    }

    // Ensure isPublished is a boolean
    if (typeof isPublished !== 'boolean') {
      return res.status(400).json({
        message: 'Validation error: "isPublished" must be a boolean.',
      });
    }

    // Check if A game with the same name, platform, storeId and or appVersion already exists.
    const existingGame = await Game.findOne({
      where: { name, platform, storeId, appVersion },
    });

    if (existingGame && existingGame.id !== game.id) {
      return res.status(400).json({
        message: 'A game with a name platform storeId and or appVersion already exists.',
      });
    }

    // Update the game
    await game.update({
      publisherId, name, platform, storeId, bundleId, appVersion, isPublished,
    });

    return res.json(game); // Return the updated game
  } catch (err) {
    console.error('Error updating game:', err);
    return res.status(500).json({ message: 'Error updating game', error: err });
  }
};

// Delete a game
const deleteGame = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Validate the game ID format
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const game = await Game.findByPk(id);

    // If the game is not found, return a "Game not found" message
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

module.exports = {
  createGame,
  getGame,
  updateGame,
  deleteGame,
  getAllGames,
};
