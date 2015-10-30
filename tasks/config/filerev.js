/**
 * Rename files using a hash of the contents.
 */
module.exports = function(grunt) {

  grunt.config.set('filerev', {
    options: {
      algorithm: 'md5',
      length: 8
    },
    html: {
      src: '.tmp/public/**/*.html'
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
    fonts: {
      src: '.tmp/public/fonts/**/*'
    },
    icons: {
      src: '.tmp/public/**/*.ico'
    }
  });

  grunt.loadNpmTasks('grunt-filerev');
};
