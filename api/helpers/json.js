/**
 * Custom handlebars helper that renders the given value
 * as a JSON string.
 */

module.exports = function (value, defaultValue) {
  return JSON.stringify(value);
};
