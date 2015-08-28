var express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

var views = path.join(process.cwd(), "views");

var phraseObject = [
{phrase: "Ukemi", description: "The term used when a person catches themself on the ground before fully hitting the ground.  It is commonly referred to as 'recovering' in the english speaking community."},
{phrase: "Setplay", description: "The term used for a set of commands practiced beforehand that can lead to a multitude of different variations, frequently used when referring to a situation where a character does something when another cahracter is recovering from a knocked down state.  It is commonly referred to as 'setups' in the english speaking community."},
{phrase: "Oki", description: "The term used for the situation when a character is recovering from a knocked down state.  It is commonly referred to as 'wakeup' in the english speaking community."}
];

app.get("/", function (req, res) {
  	var homePath = path.join(views, "home.html");
  	res.sendFile(homePath);
});

app.get("/phrases", function(req, res){
	res.send(phraseObject);
});

app.listen(3000, function () {
	console.log("Server running on port 3000\n");
});