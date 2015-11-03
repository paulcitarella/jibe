/**
 * Custom handlebars helper that returns the value given or
 * a default value if the given value is null.
 */

module.exports = function (value, defaultValue) {
  return value != null ? value : defaultValue;
};
