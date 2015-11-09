/**
 * Precompiles Angular templates into an angular module that primes
 * the template cache.
 */

var opts = {
  bootstrap: function(module, script) {
    return 'module.exports = function($templateCache) {\n' + script + '};';
  },
  prefix: '/',
  htmlmin: {
    collapseBooleanAttributes:      true,
    collapseWhitespace:             true,
    removeAttributeQuotes:          true,
    removeComments:                 true, // Only if you don't use comment directives!
    removeEmptyAttributes:          true,
    removeRedundantAttributes:      true,
    removeScriptTypeAttributes:     true,
    removeStyleLinkTypeAttributes:  true
  }
};

module.exports = function(grunt) {

  grunt.config.set('ngtemplates', {
    login: {
      cwd: 'assets',
      src: 'js/apps/login/templates/**/*.html',
      dest: '.tmp/public/js/apps/login/templates.js',
      options: opts
    },
    users: {
      cwd: 'assets',
      src: 'js/apps/users/templates/**/*.html',
      dest: '.tmp/public/js/apps/users/templates.js',
      options: opts
    },
    tasks: {
      cwd: 'assets',
      src: 'js/apps/tasks/templates/**/*.html',
      dest: '.tmp/public/js/apps/tasks/templates.js',
      options: opts
    }
  });

  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
};
