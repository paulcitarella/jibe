/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

var _ = require('lodash');
var redisUrl = require("redis-url").parse(process.env.REDIS_URL);
var redisHost = redisUrl.host.split(':');
var redisConfig = {
  host: redisHost[0],
  port: redisHost[1],
  pass: redisUrl.password
};

module.exports = {

  hookTimeout: 60000,

  session: _.merge({}, redisConfig, {
    cookie: {
      secure: true
    }
  }),

  connections: {
    jibePostgreSQL: {
      url: process.env.DATABASE_URL
    }
  },

  sockets: redisConfig,

  models: {
    migrate: 'safe'
  },

  port: process.env.PORT,

  // log: {
  //   level: "silent"
  // }
};
