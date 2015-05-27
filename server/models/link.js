'use strict';

var LinkModel = function(sequelize, DataTypes) {
  var Link = sequelize.define('link', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Link;
};

module.exports = LinkModel;
