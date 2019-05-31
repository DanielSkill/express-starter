var express = require('express');
var authController = require('../app/controllers/authController');
var passport = require('passport');

var router = express.Router();

router.get('/login', authController.login)

router.get('/logout', authController.logout)

router.post('/register', passport.authenticate('local-signup'), function(req, res) {
  res.send(req.user);
});

router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

module.exports = router;
