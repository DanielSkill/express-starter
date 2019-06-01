var models = require('../models');
var bCrypt = require('bcrypt-nodejs');

module.exports = {
  register: (req, email, password, done) => {
    // hash the password
    var generateHash = function (password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    models.User.findOne({
      where: {
        email: email
      }
    })
    .then(function (user) {
      // if user already exists
      if (user) {
        return done(null, false, {
          message: 'That email is already taken'
        });
      } else {
        // else create the user
        var userPassword = generateHash(password);

        var data = {
          email: email,
          password: userPassword,
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname
        };

        models.User.create(data).then(function (newUser, created) {
          // something went wrong
          if (!newUser) {
            return done(null, false);
          }

          // user was created
          if (newUser) {
            return done(null, newUser);
          }
        });
      }
    });
  },

  login: (req, email, password, done) => {
    // helper function to determine if password is correct
    var isValidPassword = function (userpass, password) {
      return bCrypt.compareSync(password, userpass);
    }

    models.User.findOne({
      where: {
        email: email
      }
    })
    .then(function (user) {
      // user not found
      if (! user) {
        return done(null, false, {
          message: 'Email or password does not exist'
        });
      }

      // password is incorrect
      if (! isValidPassword(user.password, password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }

      // return with user info
      var userinfo = user.get();
      return done(null, userinfo);
    })
    .catch(function (err) {
      console.log("Error:", err);
      return done(null, false, {
        message: 'Something went wrong with your login'
      });
    });
  }
}