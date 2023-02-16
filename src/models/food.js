'use strict';

module.exports = (sequelizeDB, DataTypes) => {
  return sequelizeDB.define('food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    fat: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
}; 
