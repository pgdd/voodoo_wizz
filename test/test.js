const request = require('supertest');
const assert = require('assert');
const app = require('../app/index');
const { Game } = require('../app/models');  // Directly destructure Game from the models


/**
 * Setup test data with unique storeId
 */
const gameData = {
  publisherId: "1234567890",
  name: "Test App",
  platform: "ios",
  storeId: "1234-" + Date.now(),  // Ensure storeId is unique for each test
  bundleId: "test.bundle.id",
  appVersion: "1.0.0",
  isPublished: true
};

const updatedGameData = {
  publisherId: "999000999",
  name: "Test App Updated",
  platform: "android",
  storeId: "5678-" + Date.now(),  // Ensure storeId is unique
  bundleId: "test.newBundle.id",
  appVersion: "1.0.1",
  isPublished: false
};

let gameId;  // Store the ID of the created game for later tests

// Helper function to clear the games table
const clearGamesTable = async () => {
  await Game.destroy({ where: {} });  // Delete all entries in the Games table
};

/**
 * Create Game Test
 */
describe('POST /api/games', function () {
  beforeEach(async function () {
    await clearGamesTable();  // Ensure the table is empty before each test
  });

  it('should respond with 200 and the created game data', async function () {
    const response = await request(app)
      .post('/api/games')
      .send(gameData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { body } = response;
    assert.strictEqual(body.publisherId, gameData.publisherId);
    assert.strictEqual(body.name, gameData.name);
    assert.strictEqual(body.platform, gameData.platform);
    assert.strictEqual(body.storeId, gameData.storeId);
    assert.strictEqual(body.bundleId, gameData.bundleId);
    assert.strictEqual(body.appVersion, gameData.appVersion);
    assert.strictEqual(body.isPublished, gameData.isPublished);

    gameId = body.id;  // Save the game ID for further tests
  });
});

/**
 * Get All Games Test
 */
describe('GET /api/games', function () {
  it('should respond with a list containing the created game', async function () {
    const response = await request(app)
      .get('/api/games')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const game = response.body.find(g => g.id === gameId);  // Use id as the key here
    assert.strictEqual(game.publisherId, gameData.publisherId);
    assert.strictEqual(game.name, gameData.name);
    assert.strictEqual(game.platform, gameData.platform);
    assert.strictEqual(game.storeId, gameData.storeId);
    assert.strictEqual(game.bundleId, gameData.bundleId);
    assert.strictEqual(game.appVersion, gameData.appVersion);
    assert.strictEqual(game.isPublished, gameData.isPublished);
  });
});

/**
 * Update Game Test
 */
describe('PUT /api/games/:id', function () {
  it('should respond with 200 and the updated game data', async function () {
    const response = await request(app)
      .put(`/api/games/${gameId}`)
      .send(updatedGameData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { body } = response;
    assert.strictEqual(body.publisherId, updatedGameData.publisherId);
    assert.strictEqual(body.name, updatedGameData.name);
    assert.strictEqual(body.platform, updatedGameData.platform);
    assert.strictEqual(body.storeId, updatedGameData.storeId);
    assert.strictEqual(body.bundleId, updatedGameData.bundleId);
    assert.strictEqual(body.appVersion, updatedGameData.appVersion);
    assert.strictEqual(body.isPublished, updatedGameData.isPublished);
  });
});

/**
 * Delete Game Test
 */
describe('DELETE /api/games/:id', function () {
  it('should respond with 200 and delete the game', async function () {
    const response = await request(app)
      .delete(`/api/games/${gameId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(response.body.message, 'Game deleted successfully');
  });
});

/**
 * Get all games after delete test
 */
describe('GET /api/games after delete', function () {
  it('should respond with an empty array after deletion', async function () {
    // Wait a little to ensure deletion
    await new Promise(resolve => setTimeout(resolve, 100));

    const response = await request(app)
      .get('/api/games')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(response.body.length, 0); // Ensure no games remain after deletion
  });
});
