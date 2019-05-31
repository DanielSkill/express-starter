var express = require('express');
var authController = require('../app/controllers/authController');
var passport = require('passport');

var router = express.Router();

router.post('/register', passport.authenticate('local-signup'), function(req, res) {
  res.send(req.user);
});

router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/dashboard',
  failureRedirect: '/signin'
}));

module.exports = router;
