/**
 * Rename writes a JSON file containing the map of file names to
 * their versioned counterparts.
 */
module.exports = function(grunt) {

  grunt.config.set('filerev_assets', {
    dev: {
      options: {
        dest: '.tmp/public/js/assets.json',
        cwd: '.tmp/public/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-filerev-assets');
};
