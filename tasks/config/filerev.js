/**
 * Rename files using a hash of the contents.
 */
module.exports = function(grunt) {

  grunt.config.set('filerev', {
    options: {
      algorithm: 'md5',
      length: 8
    },
    images: {
      src: '.tmp/public/images/**/*'
    },
    js: {
      src: '.tmp/public/**/*.js'
    },
    css: {
      src: '.tmp/public/**/*.css'
    },
    icons: {
      src: '.tmp/public/**/*.ico'
    }
  });

  grunt.loadNpmTasks('grunt-filerev');
};
