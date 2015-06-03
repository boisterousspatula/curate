'use strict';

/**
 * Need to add estimated time to completion field for the sections
 */


var SectionModel = function(sequelize, DataTypes) {
  var Section = sequelize.define('section', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Section.belongsTo(models.guide);
        Section.hasMany(models.link);
        Section.hasMany(models.userFavorites);
      }
    }
  });

  return Section;
};

module.exports = SectionModel;
