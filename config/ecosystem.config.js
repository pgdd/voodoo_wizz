module.exports = {
  apps: [
    {
      name: 'game-viewer-tool',
      script: './app/index.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
