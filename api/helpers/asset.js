/**
 * Custom handlebars helper for asset versioning.
 */

var assets = require('../../.tmp/public/js/assets.json');

module.exports = function(path, options) {
  var key = path.startsWith('/') ? path.substring(1) : path;
  return assets[key];
};
