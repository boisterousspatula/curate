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
        // console.log("GuideModel:", models.section);
        // console.log("Models.section.id",models.section)
        Guide.hasMany(models.section); 
        // , {as: 'Sections'}
        Guide.hasOne(models.user);
        // , {foreignKey: 'foreign_key'}
      }
    }
  });

  return Guide;
};

module.exports = GuideModel;
