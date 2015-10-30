module.exports = function (grunt) {
  grunt.registerTask('prod', [
    'compileAssets',
    'concat',
    'uglify',
    'cssmin',
    'versionAssets',
    'sails-linker:prodJs',
    'sails-linker:prodStyles'
  ]);
};
