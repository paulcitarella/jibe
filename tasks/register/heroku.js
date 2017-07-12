module.exports = function (grunt) {
  grunt.registerTask('heroku', [
    'compileAssets',
    'concat',
    'uglify',
    'cssmin',
    'versionAssets',
    'sails-linker:prodJs',
    'sails-linker:prodStyles',
    'db:migrate:up'
  ]);
};
