const request = require('supertest');
const assert = require('assert');
const app = require('../../app/index');

/**
 * Setup test data with realistic values
 */
const gameData = {
  publisherId: '1234567890',
  name: 'Super Adventure',
  platform: 'ios',
  storeId: `1234-${Date.now()}`, // Ensure storeId is unique for each test
  bundleId: 'com.superadventure.game',
  appVersion: '1.0.0',
  isPublished: true,
};

describe('Duplicate and Constraint Validation Tests', () => {
  it('should respond with 201 and the created game data', async () => {
    const response = await request(app)
      .post('/api/games')
      .send(gameData)
      .set('Accept', 'application/json')
      .expect(201);

    const { body } = response;
    assert.strictEqual(body.publisherId, gameData.publisherId);
    assert.strictEqual(body.name, gameData.name);
    assert.strictEqual(body.platform, gameData.platform);
    assert.strictEqual(body.storeId, gameData.storeId);
    assert.strictEqual(body.bundleId, gameData.bundleId);
    assert.strictEqual(body.appVersion, gameData.appVersion);
    assert.strictEqual(body.isPublished, gameData.isPublished);
  });

  it('should not allow insertion of a duplicate game with same name, platform, storeId, and appVersion', async () => {
    // Insert the original game
    await request(app)
      .post('/api/games')
      .send(gameData)
      .set('Accept', 'application/json')
      .expect(201);

    // Attempt to insert the duplicate game
    const response = await request(app)
      .post('/api/games')
      .send(gameData)
      .set('Accept', 'application/json')
      .expect(400);

    assert.strictEqual(response.body.message, 'A game with a name platform storeId and or appVersion already exists.');
  });

  it('should allow insertion of a game with the same name platform and storeId, but different appVersion', async () => {
    const newGameData = { ...gameData, appVersion: '1.0.1' }; // Updated appVersion
    const response = await request(app)
      .post('/api/games')
      .send(newGameData)
      .set('Accept', 'application/json')
      .expect(201); // This should be allowed because appVersion is different

    const { body } = response;
    assert.strictEqual(body.publisherId, newGameData.publisherId);
    assert.strictEqual(body.name, newGameData.name);
    assert.strictEqual(body.platform, newGameData.platform);
    assert.strictEqual(body.storeId, newGameData.storeId);
    assert.strictEqual(body.bundleId, newGameData.bundleId);
    assert.strictEqual(body.appVersion, newGameData.appVersion);
    assert.strictEqual(body.isPublished, newGameData.isPublished);
  });

  it('should allow insertion of a game with a different storeId and appVersion', async () => {
    const newGameData = { ...gameData, storeId: `2345-${Date.now()}`, appVersion: '1.0.2' }; // Updated storeId and appVersion
    const response = await request(app)
      .post('/api/games')
      .send(newGameData)
      .set('Accept', 'application/json')
      .expect(201); // This should be allowed because both storeId and appVersion are different

    const { body } = response;
    assert.strictEqual(body.publisherId, newGameData.publisherId);
    assert.strictEqual(body.name, newGameData.name);
    assert.strictEqual(body.platform, newGameData.platform);
    assert.strictEqual(body.storeId, newGameData.storeId);
    assert.strictEqual(body.bundleId, newGameData.bundleId);
    assert.strictEqual(body.appVersion, newGameData.appVersion);
    assert.strictEqual(body.isPublished, newGameData.isPublished);
  });
});

it('should allow insertion of a game with the same name, platform, and appVersion, but different storeId', async () => {
  // Insert the initial game into the database
  await request(app)
    .post('/api/games')
    .send(gameData)
    .set('Accept', 'application/json')
    .expect(201);

  // Prepare new game data with a different storeId
  const newGameData = { ...gameData, storeId: `2345-${Date.now()}` };

  // Attempt to insert the new game
  const response = await request(app)
    .post('/api/games')
    .send(newGameData)
    .set('Accept', 'application/json')
    .expect(201);

  const { body } = response;
  assert.strictEqual(body.publisherId, newGameData.publisherId);
  assert.strictEqual(body.name, newGameData.name);
  assert.strictEqual(body.platform, newGameData.platform);
  assert.strictEqual(body.storeId, newGameData.storeId);
  assert.strictEqual(body.bundleId, newGameData.bundleId);
  assert.strictEqual(body.appVersion, newGameData.appVersion);
  assert.strictEqual(body.isPublished, newGameData.isPublished);
});

