var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hey. This is the custom backend for the weather app, made by Bogdan Mihaileanu');
});

module.exports = router;
