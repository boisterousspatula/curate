'use strict';

/**
 * Need to add estimated time to completion that will take ~6 values
 * and compute an estimated time for whole guide
 */


var GuideModel = function(sequelize, DataTypes) {
  var Guide = sequelize.define('guide', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Guide.belongsTo(models.user);
        Guide.belongsTo(models.category);
        Guide.hasMany(models.section);
        Guide.hasMany(models.comment);
        Guide.hasMany(models.guideVote);
        Guide.hasMany(models.userFavorites);
      }
    }
  });

  return Guide;
};

module.exports = GuideModel;
