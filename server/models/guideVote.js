'use strict';

var GuideVoteModel = function(sequelize, DataTypes) {
  var GuideVote = sequelize.define('guideVote', {
    val: {
      type: DataTypes.INTEGER //-1, 0, 1
    },
  }, {
    classMethods: {
      associate: function(models) {
        GuideVote.belongsTo(models.guide);
        GuideVote.belongsTo(models.user);
      }
    }
  });

  return GuideVote;
};

module.exports = GuideVoteModel;
