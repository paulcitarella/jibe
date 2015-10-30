/**
 * Replaces references to versioned assets within static files (js, css).
 */

module.exports = function(grunt) {

  grunt.config.set('replace', {
    dev: {
      options: {
        usePrefix: false,
        patterns: [
          {
            json: function(done) {
              done(grunt.file.readJSON('.tmp/public/js/assets.json'));
            }
          }
        ]
      },
      files: [{expand: true, src: [
        '.tmp/public/**/*.html',
        '.tmp/public/**/*.css',
        '.tmp/public/**/*.js'
        ]}
      ]
    }
  });

  grunt.loadNpmTasks('grunt-replace');
};
