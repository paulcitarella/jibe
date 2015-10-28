/**
 * Precompiles Angular templates into an angular module that primes
 * the template cache.
 */

module.exports = function(grunt) {

  grunt.config.set('ngtemplates', {
    tasks: {
      cwd: 'assets',
      src: 'js/apps/tasks/templates/**/*.html',
      dest: '.tmp/public/js/apps/tasks/templates.js',
      options: {
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
      }
    }
  });

  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
};
