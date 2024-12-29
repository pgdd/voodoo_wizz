module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    publisherId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appVersion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bundleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
  });

  return Game;
};
