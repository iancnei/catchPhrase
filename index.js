var express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("bower_components"));

var views = path.join(process.cwd(), "views");