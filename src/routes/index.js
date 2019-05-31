var express = require('express');
var defaultController = require('../app/controllers/defaultController');
var middleware = require('../app/support/middleware');

var router = express.Router()

router.get('/', middleware.authenticated, defaultController.index)
router.get('/dashboard', middleware.authenticated, defaultController.dashboard)

module.exports = router;