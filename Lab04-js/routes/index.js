var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // index=filename; {} Variable
  res.render('index', { title: 'Expresso' });
});

/* Handle the Form */
router.post('/form', function (req, res) {

  var response = {
      header: req.headers,
      body: req.body
  };

  res.json(response);    
});

module.exports = router;
