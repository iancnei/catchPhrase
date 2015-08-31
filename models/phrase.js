var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catchPhrase");

var Schema = mongoose.Schema;
var PhraseSchema = new Schema({
	phrase: String,
	description: String
});

var Phrase = mongoose.model("Phrase", PhraseSchema);

module.exports.Phrase = Phrase;