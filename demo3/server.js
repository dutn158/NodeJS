var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var router = express.Router();

var mongoose = require("mongoose");
mongoose.connect("mongodb://dutn:Default@ds023428.mlab.com:23428/trandu");
var User = require("./user");

var chris = new User({
	name : 'Chris',
	username : "DuTran",
	password : "default"
});

// chris.hello(function(err, name) {
// 	if (err) {throw err;}
// 	console.log(name);
// });

// chris.save(function(err) {
// 	if (err) {throw err;}
// 	console.log("User save successfully!");
// });

// User.find(function(err, users) {
// 	if (err) {throw err;}
// 	console.log(users);
// })

router.use(function(req, res, next) {
	console.log(req.url);
	next();
});
router.route("/users")
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err) {throw err;}
			res.json(users);
		});
	})
	.post(function(req, res) {
		chris.save(function(err) {
			if (err) {throw err;}
			res.json({message : "add user successfully"});
		});
	});

app.use("/api", router);
app.listen(3000);
