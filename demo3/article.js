var mongoose = require("mongoose");
var Article = mongoose.model("Article");
var ObjectId = mongoose.Types.ObjectId;

exports.createArticle = function(req, res, next) {
	var articleModel = new Article(req.body);
	articleModel.save(function(err, article) {
		if (err) {
			res.json({
				type: false,
				data: "Error occured " + err;
			});
		} else {
			res.json({
				data: article
			});
		}
	});
};