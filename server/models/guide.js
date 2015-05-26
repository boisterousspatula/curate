'use strict';

var GuideModel = function(sequelize, DataTypes) {
  var Guide = sequelize.define('guide', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // author: {
    //   type: DataTypes.STRING
    //   // find out who is logged in at time of guide creation
    // },
    // sections: {

    // },
    // comments: {

    // }
  });


};

module.exports = GuideModel;