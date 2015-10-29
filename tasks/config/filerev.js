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
    }
  });

  grunt.config.set('filerev_assets', {
    dev: {
      options: {
        dest: '.tmp/public/js/assets.json',
        cwd: '.tmp/public/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-filerev-assets');
};
