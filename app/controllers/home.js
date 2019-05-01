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

router.get('/login', function(req, res){
	res.render('loginPage');
});

router.post('/login', passport.authenticate('login', {
	successRedirect : '/dashboard', // redirect to the secure profile section
	failureRedirect : '/loginfailed', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

router.get('/loginfailed', function(req, res){
	res.render('loginPage',{ message: req.flash('loginMessage') });
});

router.get('/dashboard', function(req, res){
  console.log(req.user)
	res.render('dashboard');
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
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

function checkloginstate(req, res, next) {

  if (!req.isAuthenticated()) {
    res.redirect('/login');
  }
}
