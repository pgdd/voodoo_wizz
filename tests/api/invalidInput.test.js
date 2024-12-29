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

describe('Invalid Input Tests', () => {
  it('should return 400 for missing required fields', async () => {
    const incompleteGameData = { ...gameData };
    delete incompleteGameData.name; // Remove name to simulate a missing required field

    const response = await request(app)
      .post('/api/games')
      .send(incompleteGameData)
      .set('Accept', 'application/json')
      .expect(400);

    assert.strictEqual(response.body.message, 'Validation error: name, platform, storeId and appVersion are required.');
  });

  it('should return 400 for invalid field types', async () => {
    const invalidGameData = { ...gameData, isPublished: 'invalid' }; // isPublished should be a boolean

    const response = await request(app)
      .post('/api/games')
      .send(invalidGameData)
      .set('Accept', 'application/json')
      .expect(400);

    assert.strictEqual(response.body.message, 'Validation error: "isPublished" must be a boolean.');
  });
});
