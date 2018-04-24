module.exports = function(app) {

	var db = require('./models/db')
	var express = require('express')
  , router = express.Router()



	app.get('/getData', function(req, res) {
	  var collection = db.getCollection('todo')

	  collection.find().toArray(function(err, docs) {
	    res.send({docs: docs, success : true})
	  })
	})

	app.post('/saveDataManual', function(req, res) {
		
		var data = req.body;
	  	var collection = db.getCollection('todo')
  		
  		collection.insert(data, function(err, result) {
			if(err) {
				res.send({success: false})
			}  else {
				res.send({success: true})
			}
		 })
	  	
	})


	app.post('/saveData', function(req, res) {
  		
  		var data = req.body;
	  	var collection = db.getCollection('todo')
  		var update = {
  			'todoData' : data.todoData
  		}
  		var query = {
  			'dateNow' : data.dateNow
  		}

        var newValue = {$set: {'todoData': data.todoData}};
		collection.update(query, newValue, function(err, data) {

            if (err) {
                console.log('err', err)
            } else {
            	console.log("Done*********************");
            	res.send({success: true})
            }
        });
	  	
	})

	app.post('/delete', function(req, res) {
		var data = req.body;
		console.log(data);

	  	var collection = db.getCollection('todo');
	  	collection.remove({ "todoData": data.todoData, "dateNow" : data.dateNow}, function(err, result) {
			if(err) {
				res.send({success: false})
			}  else {
				res.send({success: true})
			}
		})
	  	
	})


	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};