function renderPhrases(data)
{
	$('#phrase-placeholder').empty();
	//var phrases = JSON.parse(data);
	var phrases = data;
	var phraseTemplate = _.template($("#phrase-template").html());
	phrases.forEach(function(phrase)
		{
			var phraseHTML = phraseTemplate(phrase);
			$('#phrase-placeholder').append(phraseHTML);
		}
	);
}

function getPhrase()
{
	$.get("/phrases", renderPhrases);
}

$(function()
	{
		getPhrase();
	}
);