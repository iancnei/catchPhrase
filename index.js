var express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

var views = path.join(process.cwd(), "views");

var db = require("./models/phrase");

app.get("/", function (req, res) {
  	var homePath = path.join(views, "home.html");
  	res.sendFile(homePath);
});

app.get("/phrases", function(req, res){
	db.Phrase.find({}, function(err, phrases)
		{
			if(err)
			{
				console.log(err);
				res.sendStatus(500);
			}
			else
			{
				res.send(phrases);
			}
		}
	)
});

app.post("/phrases", function(req, res)
{
	var newPhrase = req.body;
	db.Phrase.create(newPhrase, function(err, phrases)
		{
			if(err)
			{
				console.log(err);
				res.sendStatus(500);
			}
			else
			{
				res.send(phrases);
			}
		}
	)
});

app.put("/phrases", function(req, res)
	{
		var updatePhrase = req.body;
		console.log(updatePhrase.phrase);
		db.Phrase.update({phrase: updatePhrase.phrase}, updatePhrase, {}, function(err, phrases)
		{
			if(err)
			{
				console.log(err);
				res.sendStatus(500);
			}
			else
			{
				res.send(phrases);
			}
		});
	}
);

app.delete("/phrases", function(req, res)
	{
		var deletePhrase = req.body;
		//console.log(deletePhrase);
		db.Phrase.remove(deletePhrase, function(err, phrases)
			{
				if(err)
				{
					console.log(err);
					res.sendStatus(500);
				}
				else
				{
					res.send(phrases);
				}
			}
		)
	}
);

app.listen(3000, function () {
	console.log("Server running on port 3000\n");
});