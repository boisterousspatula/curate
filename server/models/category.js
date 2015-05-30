'use strict';

var CategoryModel = function(sequelize, DataTypes) {
  var Category = sequelize.define('category', {
    name: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.guide);
      }
    }
  });

  return Category;
};

module.exports = CategoryModel;
