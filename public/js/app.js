var localData; // local copy of the database so we can manipulate it without worrying about affecting the database
var localIndex;

function determineDescription()
{
	localIndex = Math.floor(Math.random() * localData.length);
	return localIndex;
}

function renderDescription(index)
{
	$('#descriptionPlaceholder').empty();
	var descriptionTemplate = _.template($("#descriptionTemplate").html());
	var descriptionHTML = descriptionTemplate(localData[index]);
	$('#descriptionPlaceholder').append(descriptionHTML);
}

function checkAnswer()
{
	var userAnswer = $("#userAnswer").val().toLowerCase();
	if (userAnswer === localData[localIndex].phrase.toLowerCase())
	{
		$("#response").empty();
		$("#response").append('<div id="nextButton"><div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">Next Phrase</span></button>Correct</div></div>');
		localData.splice(localIndex, 1);
	}
	else
	{
		$("#response").empty();
		$("#response").append('<div class="alert alert-warning" role="alert">Incorrect</div>');
	}	
}

function renderPhrases(data)
{
	$('#phraseListPlaceholder').empty();
	localData = data;
	var phraseTemplate = _.template($("#phraseListTemplate").html());
	data.forEach(function(phrase)
		{
			var phraseHTML = phraseTemplate(phrase);
			$('#phraseListPlaceholder').append(phraseHTML);
		}
	);
	if($('#descriptionPlaceholder').is(':empty'))
	{
		renderDescription(determineDescription());
	}
}

function getPhrases()
{
	$.get("/phrases", renderPhrases);
}

function deletePhrase(context)
{
	var phraseId = $(context).data()._id;
	$.ajax({
		url: '/phrases',
		type: 'DELETE',
		data: {_id: phraseId},
		success: function(res)
		{
			getPhrases();
		}
	});
}

$(function()
	{
		getPhrases();

		$("#createPhrase").on('submit', function(event)
			{
				event.preventDefault();
				$.post("/phrases", $(this).serialize())
				.done(
					function(response)
					{
						getPhrases();
						$("#createPhrase")[0].reset();
						$("#createPhrase").append("Phrase added."); // find some way to get this to fade out after a little bit
					}
				);
			}
		);
		$("#updatePhrase").on('submit', function(event)
			{
				event.preventDefault();
				var updatedPhrase = {phrase: $("#updatePhr").val(),
					description: $("#updateDes").val()};
				//console.log(updatedPhrase);
				$.ajax({
					url: '/phrases',
					type: 'PUT',
					data: updatedPhrase,
					success: function(res)
					{
						getPhrases();
						$("#updatePhrase")[0].reset();
						$("#updatePhrase").append("Description updated."); // find some way to get this to fade out after a little bit
					}	
				});
			}
		);
		$("#userGuess").on('click', function(event)
			{
				checkAnswer();
			}
		);
		$("#response").on('click', function(event)
			{
				renderDescription(determineDescription());
			}
		);
	}
);