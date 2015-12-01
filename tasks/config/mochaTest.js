/**
 * Runs mocha test suites
 */

var opts = {
  reporter: 'spec'
};

module.exports = function(grunt) {

  grunt.config.set('mochaTest', {
    unit: {
      options: opts,
      src: ['test/unit/**/*.test.js']
    },
    integration: {
      options: opts,
      src: ['test/integration/bootstrap.test.js', 'test/integration/**/*.test.js']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
};
