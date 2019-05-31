var passport = require('passport');

exports.login = (req, res) => {
  res.render('auth/login')
}

exports.register = (req, res) => {
  res.render('auth/register')
}

exports.logout = (req, res) => {
  req.logout()

  res.redirect('/')
}