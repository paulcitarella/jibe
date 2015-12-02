/**
 * Runs Nightwatch functional tests.
 */

module.exports = function(grunt) {

  grunt.config.set('nightwatch', {
    options: {
      // task options
      standalone: true,

      // download settings
      jar_version: '2.44.0',
      jar_path: '.tmp/selenium-server-standalone-2.48.2.jar',
      jar_url: 'http://selenium-release.storage.googleapis.com/2.48/selenium-server-standalone-2.48.2.jar',

      // nightwatch settings
      src_folders: ['test/functional'],
      output_folder: 'report',
      test_runner: 'mocha',
      test_settings: {
        "default" : {
          launch_url: 'http://localhost:1337',
          screenshots : {
            enabled : true,
            on_failure: true,
            on_error: false,
            path : "report/screenshots"
          },
          desiredCapabilities: {
            browserName: "chrome",
            javascriptEnabled: true,
            acceptSslCerts: true
          }
        },
        firefox : {
          desiredCapabilities: {
            browserName: "firefox",
            javascriptEnabled: true,
            acceptSslCerts: true
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-nightwatch');
};
