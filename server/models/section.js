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
  });

  return Section;
};

module.exports = SectionModel;
