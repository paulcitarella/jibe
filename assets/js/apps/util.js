module.exports.jstCache = function jstCache($provide) {
  $provide.decorator('$templateCache', function($delegate) {
      var get = $delegate.get;
      $delegate.get = function (key) {
          return window.JST[key] || get(key);
      };
      return $delegate;
  });
};
