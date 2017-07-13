# jibe

A production-grade [Sails.js](http://sailsjs.org) starter application with the following pre-configured.

* Handlebars for server-side templates
* Boostrap less compiled in pipeline
* Front-end dependencies via browserify
* Modularized Angular artifacts via browserify
* Pre-compiled Angular templates
* Asset versioning for browser cacheing
* Live reloading in dev
* Enforced SSL in production
* Login via Passport
* Clusterable sessions with secure cookies
* Postgres DB
* Model ownership and scoped queries
* Admin screen and role-based access
* Background jobs
* Angular, unit, integration, functional tests
* DB migrations with tracking and autorun
* Runtime REPL console
* Deploy to Heroku

### To Run

* Make sure a Redis server is running on localhost (fresh install with default config)
* Create a local PostgreSQL database matching the config in `config/connections.js`
* `npm install`
* `npm start`
* Go to [localhost:1337](http://localhost:1337) and login with `ron@asdf.com` password `asdf1234`
