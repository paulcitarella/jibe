/**
 * Custom handlebars helper for asset versioning.
 */

var assets;

module.exports = function(path, options) {
  if (!assets) assets = require('../../.tmp/public/js/assets.json');
  var key = path.startsWith('/') ? path.substring(1) : path;
  return assets[key];
};
