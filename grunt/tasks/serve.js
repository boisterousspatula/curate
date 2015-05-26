// `grunt serve`
// Starts up a development server that watches for local file changes
// and automatically reloads them to the browser.

'use strict';

var taskConfig = function(grunt) {
  grunt.registerTask('serve', 'Open a development server within your browser', function(target) {
    // Allow for remote access to app/site via the 0.0.0.0 ip address
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }

    if (target === 'dist') {
      return grunt.task.run(['build',
      'env:all', 'env:prod', 'express:dist', 'open', 'keepalive']);
    }

    grunt.task.run([
      'clean:tmp',
      'env:all',
      'injector',
      'wiredep',
      'browserify:server',
      'sass:server',
      'autoprefixer:server'
    ]);

    if (target === 'nowatch') {
      return;
    }

    grunt.task.run([
      'express:server',
      'wait',
      'open'
    ]);

    
    return grunt.task.run(['watch']);
    
  });
};

module.exports = taskConfig;
