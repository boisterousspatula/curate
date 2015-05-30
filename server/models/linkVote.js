'use strict';

var LinkVoteModel = function(sequelize, DataTypes) {
  var LinkVote = sequelize.define('linkVote', {
    val: {
      type: DataTypes.INTEGER //-1, 0, 1
    }
  }, {
    classMethods: {
      associate: function(models) {
        LinkVote.belongsTo(models.link);
        LinkVote.belongsTo(models.user);
      }
    }
  });

  return LinkVote;
};

module.exports = LinkVoteModel;
