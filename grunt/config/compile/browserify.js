// Configuration for browserify task(s)
// Compiles JavaScript into single bundle file
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('browserify', {
    server: {
      options: {
        transform:  [ require('grunt-react').browserify ],
        browserifyOptions: {
          debug: true
        },
        watch: true
      },
      files: {
        '<%= yeogurt.tmp %>/scripts/main.js': ['<%= yeogurt.client %>/scripts/main.js']
      }
    },
    dist: {
      options: {
        transform:  [ require('grunt-react').browserify ],
        browserifyOptions: {
          debug: true
        },
        preBundleCB: function(b) {
          // Minify code
          return b.plugin('minifyify', {
            map: 'main.js.map',
            output: 'dist/client/scripts/main.js.map'
          });
        }
      },
      files: {
        '<%= yeogurt.dist %>/client/scripts/main.js': ['<%= yeogurt.client %>/scripts/main.js']
      }
    },
    test: {
      options: {
        transform:  [ require('grunt-react').browserify ],
        browserifyOptions: {
          debug: true
        },
        watch: true
      },
      files: {
        'test/scripts/bundle.js': ['test/spec/**/*.spec.js']
      }
    }
  });

};

module.exports = taskConfig;
