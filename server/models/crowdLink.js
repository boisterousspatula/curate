'use strict';

var CrowdLinkModel = function(sequelize, DataTypes) {
  var CrowdLink = sequelize.define('crowdLink',
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        CrowdLink.belongsTo(models.user);
        CrowdLink.belongsTo(models.section);
        CrowdLink.hasMany(models.linkVote);
        // TODO: Potentially add ability to favorite crowd links
      }
    }
  });

  return CrowdLink;
};

module.exports = CrowdLinkModel;
