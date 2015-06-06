'use strict';

var CrowdLinkModel = function(sequelize, DataTypes) {
  var CrowdLink = sequelize.define('crowdLink',
  {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		type: {
			type: DataTypes.ENUM('Course', 'Blog', 'Demo', 'Video')
		},
		duration: {
			type: DataTypes.ENUM('10', '30', '60', '90', '120', '150', '300', '600' )
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false
		},
		voteTotal: {
			type: DataTypes.INTEGER,
			allowNull: false,
			default:0
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
