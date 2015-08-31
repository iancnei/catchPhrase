var localData; // local copy of the database so we can manipulate it without worrying about affecting the database
var localIndex;

function determineDescription()
{
	localIndex = Math.floor(Math.random() * localData.length);
}

function renderDescription(index)
{
	$('#descriptionPlaceholder').empty();
	var descriptionTemplate = _.template($("#descriptionTemplate").html());
	var descriptionHTML = descriptionTemplate(localData[index]);
	$('#descriptionPlaceholder').append(descriptionHTML);
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
		renderDescription(0);
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
	}
);