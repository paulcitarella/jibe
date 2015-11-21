/**
 * enforceSsl
 * A policy to encforce that all requests are made via SSL when
 * served in a Heroku environment. Requires Express' `trust proxy`
 * setting to be enabled in bootstrap.js.
 */
module.exports = function(req, res, next) {
  if (!req.isSocket && !req.secure && (process.env.DYNO)) {
    sails.log.info('enforceSsl: Redirecting to SSL');
    return res.redirect([
      'https://',
      req.get('Host'),
      req.url
    ].join(''));
  } else {
    return next();
  }
};
