const { Game } = require('../app/models'); // Import the Game model

// Global setup for each test file
beforeEach(async () => {
  // Clear the database before each test
  await Game.destroy({ where: {} });
  console.log('Database cleared before test.');
});

afterEach(async () => {
  // Additional teardown logic if needed (such as clearing up mocks)
  console.log('Test completed.');
});

// Global teardown logic, if any (run after all tests are done)
after(async () => {
  console.log('All tests completed. Closing any connections...');
  // You can add logic to close DB connections or other cleanup tasks here.
});
