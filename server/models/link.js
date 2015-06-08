'use strict';

var LinkModel = function(sequelize, DataTypes) {
  var Link = sequelize.define('link',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
		description: {
			type: DataTypes.STRING(500),
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
        Link.belongsTo(models.section);
        Link.hasMany(models.linkVote);
        Link.hasMany(models.userFavorites);
      }
    }
  });

  return Link;
};

module.exports = LinkModel;
