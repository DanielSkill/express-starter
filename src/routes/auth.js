var express = require('express');
var authController = require('../app/controllers/authController');
var passport = require('passport');

var router = express.Router();

router.get('/login', authController.login)
router.get('/register', authController.register)

router.get('/logout', authController.logout)

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/dashboard',
  failureRedirect: '/register'
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

module.exports = router;
