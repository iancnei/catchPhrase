var db = require("./models/phrase");

var phraseObject = [
{phrase: "Ukemi", description: "The term used when a person catches themself on the ground before fully hitting the ground.  It is commonly referred to as 'recovering' in the english speaking community."},
{phrase: "Setplay", description: "The term used for a set of commands practiced beforehand that can lead to a multitude of different variations, frequently used when referring to a situation where a character does something when another character is recovering from a knocked down state.  It is commonly referred to as 'setups' in the english speaking community."},
{phrase: "Oki", description: "The term used for the situation when a character is recovering from a knocked down state.  It is commonly referred to as 'wakeup' in the english speaking community."}
];

db.Phrase.remove({}, function(removeErr, removedPhrase)
	{
		if(removeErr)
		{
			console.log(removeErr);
			process.exit();
		}
		else
		{
			phraseObject.forEach(function(phrase)
				{
					db.Phrase.create(phrase, function(createErr, addedPhrase)
						{
							if(createErr)
							{
								console.log(createErr);
								process.exit();
							}
							else
							{
								//console.log(addedPhrase);
							}
						}
					);
				}
			)
		}
	}
);

/*db.Phrase.find({}, function(err, foundPhrase)
	{
		console.log(foundPhrase);
	}
)*/

/*
  Official documentation from Mongoose on Update:
    http://mongoosejs.com/docs/api.html#model_Model.update
    For now you can keep the third argument of of the update method empty. You should still
    checkout hte mongoose document for the different options you can put in there.
*/
/*var db = require("./models");
var newFood = { name: "apple", yumminess: "tastes like worms!!"};
db.Food.update({ _id: "55e3254b9e36e3481416749d"}, newFood, {}, function(err, success) {
    if(err){ return console.log(err);}
    console.log("SUCCESS!!!!!");
    return console.log(success);
});*/