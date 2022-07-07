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
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/booking", function(req,res) {
  db.getCollection("bookings").insertOne(req.body);
  res.status(201);
});

router.get("/booking", function(req,res) {
  result = db.getCollection("bookings").findOne(req.body);
  if (result) {
    res.status(201).json(result);
  } else {
    res.status(404).send("not found");
  }
})

module.exports = router;
