const request = require('supertest');
const assert = require('assert');
const app = require('../../app/index'); // Your app

// Game data to use in the tests
const gameData = {
  publisherId: '1234567890',
  name: 'Super Adventure',
  platform: 'ios',
  storeId: `1234-${Date.now()}`, // Ensure storeId is unique for each test
  bundleId: 'com.superadventure.game',
  appVersion: '1.0.0',
  isPublished: true,
};

describe('Game CRUD Operations', () => {
  let gameId; // Store the ID of the created game for future tests

  // CREATE Game (POST)
  it('should create a game and respond with 201', async () => {
    const response = await request(app)
      .post('/api/games')
      .send(gameData)
      .set('Accept', 'application/json')
      .expect(201); // Expect 201 (created)

    const { body } = response;
    gameId = body.id; // Store the ID for future tests

    // Basic assertions
    assert.strictEqual(body.publisherId, gameData.publisherId);
    assert.strictEqual(body.name, gameData.name);
    assert.strictEqual(body.platform, gameData.platform);
    assert.strictEqual(body.storeId, gameData.storeId);
    assert.strictEqual(body.bundleId, gameData.bundleId);
    assert.strictEqual(body.appVersion, gameData.appVersion);
    assert.strictEqual(body.isPublished, gameData.isPublished);
  });

  // Read Game by ID (GET)
  it('should get the game by ID', async () => {
    // Create the game again to get a new gameId since DB is cleared before each test
    const response = await request(app)
      .post('/api/games')
      .send(gameData)
      .set('Accept', 'application/json')
      .expect(201); // Expect 201 (created)

    gameId = response.body.id; // Store the new gameId

    const getResponse = await request(app)
      .get(`/api/games/${gameId}`)
      .set('Accept', 'application/json')
      .expect(200); // Expect 200 (OK)

    const { body } = getResponse;

    // Basic assertions
    assert.strictEqual(body.id, gameId);
    assert.strictEqual(body.publisherId, gameData.publisherId);
    assert.strictEqual(body.name, gameData.name);
    assert.strictEqual(body.platform, gameData.platform);
    assert.strictEqual(body.storeId, gameData.storeId);
    assert.strictEqual(body.bundleId, gameData.bundleId);
    assert.strictEqual(body.appVersion, gameData.appVersion);
    assert.strictEqual(body.isPublished, gameData.isPublished);
  });

  // UPDATE Game (PUT)
  it('should update the game details', async () => {
    const response = await request(app)
      .post('/api/games')
      .send(gameData)
      .set('Accept', 'application/json')
      .expect(201); // Expect 201 (created)

    gameId = response.body.id; // Store the new gameId

    const updatedData = { ...gameData, appVersion: '1.0.1' };

    const updateResponse = await request(app)
      .put(`/api/games/${gameId}`)
      .send(updatedData)
      .set('Accept', 'application/json')
      .expect(200); // Expect 200 (OK)

    const { body } = updateResponse;

    // Assertions to ensure the game has been updated
    assert.strictEqual(body.id, gameId);
    assert.strictEqual(body.appVersion, '1.0.1'); // Check updated field
  });

  // DELETE Game (DELETE)
  it('should delete the game by ID', async () => {
    const response = await request(app)
      .post('/api/games')
      .send(gameData)
      .set('Accept', 'application/json')
      .expect(201); // Expect 201 (created)

    gameId = response.body.id; // Store the new gameId

    const deleteResponse = await request(app)
      .delete(`/api/games/${gameId}`)
      .set('Accept', 'application/json')
      .expect(200); // Expect 200 (OK)

    // Assert response
    assert.strictEqual(deleteResponse.body.message, 'Game deleted successfully');
  });

  // Ensure the game was actually deleted (GET after DELETE)
  it('should return 404 when trying to get the deleted game', async () => {
    const response = await request(app)
      .post('/api/games')
      .send(gameData)
      .set('Accept', 'application/json')
      .expect(201); // Expect 201 (created)

    gameId = response.body.id; // Store the new gameId

    // First delete the game
    await request(app)
      .delete(`/api/games/${gameId}`)
      .set('Accept', 'application/json')
      .expect(200); // Expect 200 (OK)

    // Now check if it's really deleted
    const getResponse = await request(app)
      .get(`/api/games/${gameId}`)
      .set('Accept', 'application/json')
      .expect(404); // Expect 404 (Not Found)

    assert.strictEqual(getResponse.body.message, 'Game not found');
  });
});

// Game Search API
describe('Game Search API', () => {
  it('should return games that match the name', async () => {
    await request(app)
      .post('/api/games')
      .send(gameData)
      .set('Accept', 'application/json')
      .expect(201);

    const response = await request(app)
      .post('/api/games/search')
      .send({ name: 'Super Adventure' })
      .set('Accept', 'application/json')
      .expect(200);

    const { body } = response;
    assert.strictEqual(body.length, 1);
    assert.strictEqual(body[0].name, 'Super Adventure');
  });

  it('should return games that match the platform', async () => {
    await request(app)
      .post('/api/games')
      .send(gameData)
      .set('Accept', 'application/json')
      .expect(201);

    const response = await request(app)
      .post('/api/games/search')
      .send({ platform: 'ios' })
      .set('Accept', 'application/json')
      .expect(200);

    const { body } = response;
    assert.strictEqual(body.length, 1);
    assert.strictEqual(body[0].platform, 'ios');
  });

  it('should return all games if neither name nor platform is provided', async () => {
    await request(app)
      .post('/api/games')
      .send(gameData)
      .set('Accept', 'application/json')
      .expect(201);

    const response = await request(app)
      .post('/api/games/search')
      .send({})
      .set('Accept', 'application/json')
      .expect(200);

    const { body } = response;
    assert.strictEqual(body.length, 1);
  });
});
