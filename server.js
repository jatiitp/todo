// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
var port = process.env.PORT || 8080; // set our port

// config files
// var db = require('./config/db');
var db = require('./app/models/db');
// Connect to Mongo on start


// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
db.connect('mongodb://localhost:27017/Shadowfax', function(err) {
	console.log("Welcome to Shadowfax");
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(port, function() {
      console.log('Listening on port 8080...Server started')
    })
  }
})
// app.listen(port);	
// console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app