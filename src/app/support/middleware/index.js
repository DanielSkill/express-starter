var view = require('./view')
var authenticated = require('./authenticated')

module.exports = {
  view: view.view,
  authenticated: authenticated.isAuthenticated
}