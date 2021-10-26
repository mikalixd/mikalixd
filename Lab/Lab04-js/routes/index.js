var express = require('express');
var router = express.Router();

// Lokijs init - import
var loki = require('lokijs');

var db = new loki('data.json', {
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 4000
});

// implement the autoloadback referenced in loki constructor
function databaseInitialize() {
    var bookings = db.getCollection("bookings");
    if (bookings === null) {
        bookings = db.addCollection("bookings");
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // index=filename; {} Variable
  res.render('index', { title: 'Expresso' });
});

/* Handle the Form POST */
router.post('/form', function (req, res) {

  var response = {
      header: req.headers,
      body: req.body
  };
  // Insert Data in server-side
  // Ensure only number is insert into DB; If not number, NaN will be inserted  
  req.body.numTickets = parseInt(req.body.numTickets);
  db.getCollection("bookings").insert(req.body);
  res.json(response);    
});

/* Display all Bookings */
// Route to booking.ejs; Retrieve all data (DB -> result[var] -> bookings.ejs[render])
router.get('/bookings', function (req, res) {
  var result = db.getCollection("bookings").find();
  res.render('bookings', { bookings: result });
});

module.exports = router;
