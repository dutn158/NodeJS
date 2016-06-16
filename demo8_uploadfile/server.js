var express = require("express");
var multer = require("multer");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var app = express();

var router = express.Router();
var uploading = multer({
	dest:__dirname + '/uploads',
	limits:{fileSize:1000000, files: 1}
});

var type = uploading.single('image');

router.use(function(req, res, next) {
	console.log("something happend");
	console.log(req.headers);
	console.log(req.body);
	next();
});
router.route("/")
	.get(function(req, res) {
		res.sendFile(__dirname + '/public/upload.html');
	})
	.post(function(req, res) {
		res.json({message : "hello post request"});
		res.json(req.body);
	});

router.post("/upload", type, function(req, res) {
		console.log(req.body);
		console.log(req.file);		
		res.json(req.file);		
	});

router.route("/view/:id")
	.get(function(req, res) {
		var img = fs.readFileSync(__dirname + "/uploads/" + req.params.id);
		res.writeHead(200, {"Content-Type": "image/*"});
		res.end(img);
	});

app.use("/api", router);
app.use(bodyParser.json());
app.listen(3000);
console.log("magic happens on port " + 3000);
