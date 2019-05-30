var express = require('express');
var defaultController = require('../app/controllers/defaultController');

var router = express.Router()

router.get('/', defaultController.index)

module.exports = router;