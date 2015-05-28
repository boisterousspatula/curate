'use strict';

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
        Section.hasMany(models.link);
        Section.hasOne(models.guide);
      }
    }
  });

  return Section;
};

module.exports = SectionModel;
