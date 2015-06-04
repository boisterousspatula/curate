'use strict';

var CommentModel = function(sequelize, DataTypes) {
  var Comment = sequelize.define('comment',
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.guide, {allowNull: false});
        Comment.belongsTo(models.user, {allowNull: false});
      }
    }
  });

  return Comment;
};

module.exports = CommentModel;
