function renderPhrases(data)
{
	$('#phraseListPlaceholder').empty();
	//var phrases = JSON.parse(data); data;
	var phraseTemplate = _.template($("#phraseListTemplate").html());
	var descriptionTemplate = _.template($("#descriptionTemplate").html());
	data.forEach(function(phrase)
		{
			var phraseHTML = phraseTemplate(phrase);
			$('#phraseListPlaceholder').append(phraseHTML);
		}
	);
	data.forEach(function(phrase)
		{
			var descriptionHTML = descriptionTemplate(phrase);
			$('#descriptionPlaceholder').append(descriptionHTML);
		}
	);
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