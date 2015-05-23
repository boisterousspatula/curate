// Configuration for Sass task(s)
// Compile Sass stylesheets to single `.css` file
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('sass', {
    server: {
      options: {
        precision: 10,
        outputStyle: 'nested',
        sourceMap: true,
        includePaths: [
          '<%= yeogurt.client %>/bower_components',
          '<%= yeogurt.client %>/styles/'
        ]
      },
      files: {
        '<%= yeogurt.tmp %>/styles/main.css': '<%= yeogurt.client %>/styles/main.{scss,sass}'
      }
    },
    dist: {
      options: {
        precision: 10,
        outputStyle: 'compressed',
        sourceMap: true,
        includePaths: [
          '<%= yeogurt.client %>/bower_components',
          '<%= yeogurt.client %>/styles/'
        ]
      },
      files: {
        '<%= yeogurt.dist %>/client/styles/main.css': '<%= yeogurt.client %>/styles/main.{scss,sass}'
      }
    }
  });

};

module.exports = taskConfig;
