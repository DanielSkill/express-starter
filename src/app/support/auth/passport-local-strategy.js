var passport = require('passport');
var authService = require('../../services/authService');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../../models')

passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },

  function (req, email, password, done) {
    authService.register(req, email, password, done)
  }
));

passport.use('local-login', new LocalStrategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },

  function (req, email, password, done) {
    authService.login(req, email, password, done)
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  models.User.findByPk(id).then(function (user) {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});
