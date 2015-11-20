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

module.exports = {

  session: {
    cookie: {
      secure: true
    },
    url: process.env.REDIS_URL
  },

  connections: {
    jibePostgreSQL: {
      url: process.env.DATABASE_URL
    }
  },

  socket: {
    url: process.env.REDIS_URL
  },

  models: {
    migrate: 'safe'
  },

  port: process.env.PORT,

  // log: {
  //   level: "silent"
  // }
};
