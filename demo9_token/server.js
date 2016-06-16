var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var config = require("./config");
var user = require("./app/models/user");

mongoose.connect(config.database);
app.set("superSecret", config.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan("dev"));

router.use(function(req, res, next) {
	console.log("Somethings happend");
	next();
});

router.route("/")
	.get(function(req, res) {
		res.json({message:"Hello API"});
	});

router.route("/setup")
	.get(function(req, res) {
		var nick = new user({
			name : "dutn",
			password : "123456",
			admin : true
		});
		nick.save(function(err){
			if(err) {
				throw err;
			}
			res.json({success: true});
		});
	});

router.route("/users")
	.get(function(req, res){
		user.find({}, function(err, users){
			if(err) throw err;
			res.json(users);
		});
	});

router.route("/login")
	.get(function(req, res) {
		res.sendFile(__dirname + "/views/login.html")
	});

router.route("/authenticate")
	.post(function(req, res) {
		var username = req.body.username;
		var password = req.body.password;
		user.findOne({'name': username, 'password': password},
				function(err, user){
			if(!user) {
				res.json({message:"Login falure"});
			} else {
				var token = jwt.sign(user, 
				app.get("superSecret"),
				{
					
				});
				res.json({
					"token" : token,
					"user" :user,
					"success" : true
				});
			}
			});
	});

app.use("/api", router);
app.listen(3000);
