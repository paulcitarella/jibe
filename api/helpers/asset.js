/**
 * Custom handlebars helper for asset versioning.
 */

var assets;

module.exports = function(path, options) {
  if (!assets) {
    try {
      assets = require('../../.tmp/public/js/assets.json');
    } catch (e) {
      // We're running without versioning,
      // just return the unaltered path
      return path;
    }
  }
  var key = path.startsWith('/') ? path.substring(1) : path;
  return assets[key];
};
