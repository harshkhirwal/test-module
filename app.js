

const express = require('express');
const config = require('./config/config');
const glob = require('glob');
const mongoose = require('mongoose');

mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

const models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
const app = express();

module.exports = require('./config/express')(app, config);

var passport = require('passport'),
  session = require("express-session");
  app.use(session({ secret: 'nitrkl' ,saveUninitialized: false, resave: false})); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
require('./config/passport')(passport); // pass passport for configuration

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});
