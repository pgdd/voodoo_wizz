const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Determine environment and load the appropriate .env file
let envFile;
if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production';
} else if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
} else {
  envFile = '.env.development';
}
dotenv.config({ path: envFile });

console.log(`Loading environment file: ${envFile}`);
console.log(`NODE_ENV is set to: ${process.env.NODE_ENV}`);

// Function to run shell commands
const runCommand = (command) => {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    process.exit(1);
  }
};

// Path to the database file (if applicable, e.g., SQLite)
const dbName =
  process.env.DB_NAME ||
  (process.env.NODE_ENV === 'test' ? 'database_test.sqlite3' : 'database.sqlite3');
const dbPath = path.resolve(__dirname, '../../', dbName);

if (process.env.NODE_ENV === 'test') {
  console.log(`Seeding test database at: ${dbPath}`);

  // Delete the test database file if it exists
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('Existing test database deleted.');
  } else {
    console.log('No existing test database found. Proceeding to seed.');
  }

  // Run migrations for test environment
  runCommand('npx sequelize db:migrate --env test');
} else if (process.env.NODE_ENV === 'development') {
  console.log(`Setting up development database at: ${dbPath}`);

  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath); // Delete the file
    console.log('Existing development database deleted.');
  } else {
    console.log('No existing development database found. Proceeding to create a new one.');
  }

  runCommand('npx sequelize db:migrate --env development');
  runCommand('npx sequelize db:seed:all --env development');
} else if (process.env.NODE_ENV === 'production') {
  console.log('Preparing production environment.');

  // Run migrations for production environment
  runCommand('npx sequelize db:migrate --env production');

  console.log('Production setup completed.');
} else {
  console.error(`Unknown NODE_ENV: ${process.env.NODE_ENV}`);
  process.exit(1);
}

console.log('Setup completed successfully.');
