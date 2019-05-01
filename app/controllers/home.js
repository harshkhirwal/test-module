const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
var User = require('../models/user');

module.exports = (app) => {
  app.use('/', router);
};

var passport = require('passport');
var flash    = require('connect-flash');
var session = require('express-session');


router.use(session({ secret: 'nitrkl' ,saveUninitialized: false, resave: false})); // session secret
router.use(passport.initialize());
router.use(passport.session()); // persistent login sessions
router.use(flash());

router.get('/', (req, res, next) => {
  Article.find((err, articles) => {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

router.get("/login", function(req, res){
  res.render("loginPage");
});

router.post("/login", function(req, res){
  User.findOne({email: req.body.email}, function(err,user){
    if(err)
      res.send("Error processing request");
    else {
      console.log(user);
      console.log(req.body.password);
      if (user != null && user != {} && user != undefined) {
        if (user.password != req.body.password)
          res.send("Incorrect credentials");

        else
          res.render("dashboard", {email: req.body.email});
      }
      else
        res.send("User not found");
    }
  });
});

router.get("/register", function(req, res){
  res.render("registerPage");

});
router.post("/register", function(req, res){
  var user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.save();
  res.send("Done");

});
