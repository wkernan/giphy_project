var movies = ['Braveheart', 'Dumb and Dumber', 'The Godfather', 'Anchorman', 'Interstellar', 'Pride and Prejudice', 'Pulp Fiction'];

function renderButtons() {
	$('.movie-list').empty();
	movies.forEach(function(m) {
		//var div = $('<div>').addClass('btn-group');
		var button = $('<button>');
		button.addClass('movie btn btn-default');
		button.attr('data-name', m);
		button.text(m);
		//div.append(button);
		$('.movie-list').append(button);
	})
}

$('#addMovie').on('click', function() {
	var movie = $('#movieInput').val().trim();
	movies.push(movie);
	renderButtons();
	$('#movieInput').val('');
	return false;
})

function displayGifs() {
	$('.gifView').empty();
	var movie = $(this).attr('data-name');
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&limit=10&api_key=dc6zaTOxFJmzC";
	var rating = "";
	$.ajax({
		url: queryUrl,
		method: 'GET'
	}).done(function(response) {
		var gifs = response.data;
		console.log(gifs);
		gifs.forEach(function(g) {
			var div = $('<div>');
			div.addClass('gifs');
			if(g.rating === '') {
				rating = $('<h3>GIF Rated: Unknown</h3>');
			} else {
				rating = $('<h3>GIF Rated: ' + g.rating.toUpperCase() + '</h3>');
			}
			var img = $('<img>');
			img.attr({'src': g.images.fixed_height_still.url, 'data-animate': g.images.fixed_height.url, 'data-still': g.images.fixed_height_still.url, 'data-state': 'still', 'id': 'gif'});
			div.append(rating);
			div.append(img);
			$('.gifView').append(div);
		})
		/*var img = $('<img>');
		img.attr('src', response.data[0].images.fixed_height_still.url);
		$('.gifView').append(img);*/
	});
}

function playGifs() {
	var state = $(this).attr('data-state');
	if(state === 'still') {
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	} else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}
}

$(document).on('click', '#gif', playGifs);

$(document).on('click', '.movie', displayGifs);


renderButtons();