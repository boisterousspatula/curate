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
        Guide.belongsTo(models.user);
        Guide.hasMany(models.section); 
        Guide.hasMany(models.comment);
      }
    }
  });

  return Guide;
};

module.exports = GuideModel;
