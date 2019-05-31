var passport = require('passport');

exports.login = (req, res) => {
  res.render('auth/login')
}

exports.logout = (req, res) => {
  req.logout()

  res.redirect('/')
}