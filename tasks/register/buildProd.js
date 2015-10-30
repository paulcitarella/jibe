module.exports = function (grunt) {
  grunt.registerTask('buildProd', [
    'compileAssets',
    'concat',
    'uglify',
    'cssmin',
    'versionAssets',
    'linkAssetsBuildProd',
    'clean:build',
    'copy:build'
  ]);
};
