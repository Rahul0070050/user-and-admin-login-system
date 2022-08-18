var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Cache-Control', 'private,no-cache,no-store,must-revadilate')
  res.render('index', { title: 'Express' });
});

module.exports = router;
