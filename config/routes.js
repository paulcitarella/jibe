/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  '/': {
    controller: 'HomeController',
    action: 'index',
    locals: {
      layout: 'cover',
      pageId: 'home',
      ngApp: 'login',
      base: '/'
    }
  },

  'get /users/me': 'UserController.me',

  'get /users': {
    controller: 'UserController',
    action: 'list',
    sort: 'id DESC',
    locals: {
      pageId: 'users',
      ngApp: 'users',
      base: '/users/'
    }
  },

  'get /api/users': {
    controller: 'UserController',
    action: 'find',
    sort: 'id DESC'
  },

  'get /tasks': {
    controller: 'TaskController',
    action: 'list',
    sort: 'id ASC',
    locals: {
      pageId: 'tasks',
      ngApp: 'tasks',
      base: '/tasks/',
      tasksActive: true
    }
  },

  // sails-auth generated routes
  'post /register': 'UserController.register',
  'get /logout': 'AuthController.logout',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback'
};

// Routes for deep angular links with HTML5 url mode
exports.routes['get /login'] = exports.routes['/'];
exports.routes['get /register'] = exports.routes['/'];
exports.routes['get /users/*'] = exports.routes['get /users'];
