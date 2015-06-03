'use strict';

var UserFavorites = function(sequelize, DataTypes) {
  var UserFavorites = sequelize.define('userFavorites',{
    // type: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // typeId: {
    //   type: DataTypes.INT,
    //   allowNull: false
    // }

  }, {
    classMethods: {
      associate: function(models) {
        UserFavorites.hasMany(models.link);
        UserFavorites.hasMany(models.section);
        UserFavorites.hasMany(models.guide);
        UserFavorites.belongsTo(models.user);
      }
    }
  });

  return UserFavorites;
};

module.exports = UserFavorites;