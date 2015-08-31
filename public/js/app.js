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

function switchDescription()
{
	$("#userAnswer").val("");
	renderDescription(determineDescription());
}

function checkAnswer()
{
	var userAnswer = $("#userAnswer").val().toLowerCase();
	$("#response").empty();
	if (userAnswer === localData[localIndex].phrase.toLowerCase())
	{
		
		localData.splice(localIndex, 1);
		if(localData.length === 0)
		{
			$("#descriptionTitle").text("Congratulations, You knew all the Phrases!");
			switchDescription();
		}
		else
		{
			$("#response").append('<div id="nextButton"><div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">Next Phrase</span></button>Correct</div></div>');
		}
	}
	else
	{
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
						$("#createResponse").empty();
						$("#createResponse").append('<div class="alert alert-success" role="alert">Phrase: "' + $("#createPhr").val() + '" Created</div>');
						$("#createPhrase")[0].reset();
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
						$("#updateResponse").empty();
						$("#updateResponse").append('<div class="alert alert-success" role="alert">Phrase "' + $('#updatePhr').val() + '" Updated</div>');
						$("#updatePhrase")[0].reset();
					}
				});
			}
		);
		$("#userGuess").on('click', function(event)
			{
				checkAnswer();
			}
		);
		$("#userAnswer").on('keypress', function(event)
			{
				if (event.keyCode === 13)
				{
					checkAnswer();
				}
			}
		);
		$("#response").on('click', function(event)
			{
				switchDescription();
			}
		);
	}
);