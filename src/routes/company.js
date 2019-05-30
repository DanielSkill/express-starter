var express = require('express');
var companyController = require('../app/controllers/companyController');

var router = express.Router()

router.get('/', companyController.index)
router.post('/create', companyController.create)
router.post('/update/:id', companyController.update)
router.delete('/delete/:id', companyController.delete)

module.exports = router;