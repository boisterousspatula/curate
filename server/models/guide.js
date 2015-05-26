'use strict';

var GuideModel = function(sequelize, DataTypes) {
  var Guide = sequelize.define('guide', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Guide;
};

module.exports = GuideModel;
