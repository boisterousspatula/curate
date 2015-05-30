'use strict';

var LinkModel = function(sequelize, DataTypes) {
  var Link = sequelize.define('link',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Link.belongsTo(models.section);
        Link.hasMany(models.linkVote);
      }
    }
  });

  return Link;
};

module.exports = LinkModel;
