var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // index=filename; {} Variable
  res.render('index', { title: 'Expresso' });
});

module.exports = router;
