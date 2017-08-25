var express = require('express')
var router = express.Router()

var indexController = require('../controllers/indexController');
router.get('/', indexController.get_index);
router.post('/search', indexController.get_tweets);

module.exports = router