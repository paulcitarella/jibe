module.exports = function (grunt) {
  grunt.registerTask('versionAssets', [
    'filerev',
    'filerev_assets',
    'replace'
  ]);
};
