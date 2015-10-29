module.exports = function (grunt) {
  grunt.registerTask('default', [
    'compileAssets',
    'filerev',
    'filerev_assets',
    'linkAssets',
    'watch'
  ]);
};
