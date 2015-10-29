module.exports = function (grunt) {
  grunt.registerTask('default', [
    'compileAssets',
    'filerev',
    'linkAssets',
    'watch'
  ]);
};
