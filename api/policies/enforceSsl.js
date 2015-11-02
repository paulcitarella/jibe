/**
 * enforceSsl
 * A policy to encforce that all requests are made via SSL when
 * served in a Heroku environment. Assumes that the app is behind a
 * load balancer that terminates SSL, and thus bases the decision to
 * redirect on the x-forwarded-proto header value.
 */
module.exports = function(req, res, next) {
  if ((req.headers['x-forwarded-proto'] !== 'https') && (process.env.HEROKU_APP_ID)) {
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
