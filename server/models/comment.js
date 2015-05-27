'use strict';

var CommentModel = function(sequelize, DataTypes) {
  var Comment = sequelize.define('comment', {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Comment;
};

module.exports = CommentModel;