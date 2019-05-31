var view = require('./view')
var authenticated = require('./authenticated')

module.exports = {
  view: view.view,
  authenticatd: authenticated.isAuthenticated
}