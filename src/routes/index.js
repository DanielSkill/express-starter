var express = require('express');
var defaultController = require('../app/controllers/defaultController');
var auth = require('../app/support/middleware/authenticated');

var router = express.Router()

router.get('/', auth.isAuthenticated, defaultController.index)
router.get('/dashboard', auth.isAuthenticated, defaultController.dashboard)

module.exports = router;