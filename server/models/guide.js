'use strict';

var GuideModel = function(sequelize, DataTypes) {
  var Guide = sequelize.define('guide', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Guide.hasMany(models.section); 
        Guide.hasOne(models.user);
      }
    }
  });

  return Guide;
};

module.exports = GuideModel;
