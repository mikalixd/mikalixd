var express = require('express');
var router = express.Router();

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
router.get('/', function (req, res, next) {
  // index=filename; {} Variable
  res.render('index', { title: 'Expresso' });
});

/* Handle the Form */
router.post('/form', function (req, res) {

  var response = {
    header: req.headers,
    body: req.body
  };
  // Insert Data in server-side
  req.body.numTickets = parseInt(req.body.numTickets);
  db.getCollection("bookings").insert(req.body);
  res.json(response);
});

/* Display all Bookings */
router.get('/bookings', function (req, res) {
  var result = db.getCollection("bookings").find();
  res.render('bookings', { bookings: result });
});

/* Display a single Booking */
router.get('/bookings/read/:id', function (req, res) {
  console.log(req.params.id)
  let result = db.getCollection("bookings").findOne({ $loki: parseInt(req.params.id) });
  if (result)
    res.render('booking', { booking: result });
  else
    res.status(404).send('Unable to find the requested resource!');
});

// Delete a single Booking 
router.post('/bookings/delete/:id', function (req, res) {
  // db.getCollection("bookings").findAndRemove({ $loki: parseInt(req.params.id) });
  let result = db.getCollection("bookings").findOne({ $loki: parseInt(req.params.id) });
  if (!result) return res.status(404).send('Unable to find the requested resource!');
  db.getCollection("bookings").remove(result);
  if (req.get('Accept').indexOf('html') === -1) {
    return res.status(204).send();	    // for ajax request
  } else {
    return res.redirect('/bookings');	// for normal HTML request
  }

});

// Form for updating a single Booking 
router.get('/bookings/update/:id', function (req, res) {
  let result = db.getCollection("bookings").findOne({ $loki: parseInt(req.params.id) });
  if (!result) return res.status(404).send('Unable to find the requested resource!');
  res.render("update", { booking: result })

});

// Updating a single Booking 
router.post('/bookings/update/:id', function (req, res) {

  let result = db.getCollection("bookings").findOne({ $loki: parseInt(req.params.id) });

  if (!result) return res.status(404).send('Unable to find the requested resource!');

  db.getCollection("bookings").findAndUpdate({ $loki: parseInt(req.params.id) },
    function (item) {
      Object.assign(item, req.body)
    });

  res.send("Booking updated.");

});

/* Searching */
router.get('/bookings/search', function (req, res) {

  var whereClause = {};

  if (req.query.name) whereClause.name = { $regex: req.query.name };

  var parsedNumTickets = parseInt(req.query.numTickets);
  if (!isNaN(parsedNumTickets)) whereClause.numTickets = parsedNumTickets;

  let results = db.getCollection("bookings").find(whereClause)

  return res.render('bookings', { bookings: results });

});

/* Pagination in DB Query 分頁*/
router.get('/bookings/paginate', function (req, res) {

  // Limit: Control record to return; Offset: How many record would be skip
  // Nah will be return if limit not provided
  var count = Math.max(req.query.limit, 2) || 2;
  var start = Math.max(req.query.offset, 0) || 0;

  var results = db.getCollection("bookings").chain().find({}).offset(start).limit(count).data();

  var totalNumRecords = db.getCollection("bookings").count();

  return res.render('paginate', { bookings: results, numOfRecords: totalNumRecords });

});

// AJAX pagination
router.get('/bookings/aginate', function (req, res) {
  if (req.get('Accept').indexOf('html') === -1) {
    var count = Math.max(req.query.limit, 2) || 2;
    var start = Math.max(req.query.offset, 0) || 0;
    var results = db.getCollection("bookings").chain().find({}).offset(start).limit(count).data();
    return res.json(results);

  } else {
    var totalNumRecords = db.getCollection("bookings").count();
    return res.render('aginate', { numOfRecords: totalNumRecords });
  }
});

//VueJS
router.get("/bookings/vaginate", function (req, res) {
  // 'Accept' to check AJAX or not
  if (req.get('Accept').indexOf('html') === -1) {

    var count = Math.max(req.query.limit, 2) || 2;
    var start = Math.max(req.query.offset, 0) || 0;

    var results = db.getCollection("bookings").chain().find({}).offset(start).limit(count).data();

    return res.json(results);

  } else {

    var totalNumRecords = db.getCollection("bookings").count();

    return res.render('vaginate', { numOfRecords: totalNumRecords });
  }
});

module.exports = router;
