


// SETUP VARIABLES
// ==========================================================
// user choice from input from
var userChoice = $('#food-input').val().trim();
var foodButtons = ['pizza', 'hamburger', 'bacon', 'cheese', 'tacos', 'bbq', 'ribs'];
$(".gifHolder").hide();



// FUNCTIONS
// ==========================================================

// This function will trigger the AJAX Call
	// $('#foodButton').on('click', function(){
		function getmydata (){
		$(".gifHolder").show();
		//search based on button data-name
		var keyWord = $(this).attr('data-name');
		var apiKey = "dc6zaTOxFJmzC";
		// the API URL
		var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+keyWord+'&limit=6&rating=pg&api_key='+apiKey;

		// ajax hits ths gify API
		$.ajax({url: queryURL, method: 'GET'}).done(function(results) {
			console.log(keyWord)
			console.log(results)

			for (var i = 0; i < results.data.length; i++){
				
				// Creating a div for all the info I need to display
				var final = $('<div class="thumbnails" style="float:left; margin-right:1em;">')
				// Getting the info I need from the results
				var rating = results.data[i].rating
				var ratingText = $('<p>').text("gif rating = " + rating);
				final.append(ratingText);

				 /*still images at 200px*/
				var still = results.data[i].images.fixed_width_still.url;/*still*/
				
				// creating a data-still of the still image, I will have two still urls as attributes

				/*gif images at 200px*/
				var gif = results.data[i].images.fixed_width_downsampled.url/*gif*/


				var image = $('<img>').attr({

					'src':still,
					'class':'image',
					'data-motion': 'false',
					'data-gif':gif,
					'data-still':still
				});
				
				final.append(image);
				// console.log((results).data[i].images.fixed_width_still.url)
				// pushing data into the approbriate ID
				 $(".gifs").prepend(final);
				 // var still2 = $('<img class="image">').attr('data-still',

			};

		});
	     	 
	};
// ========================================================
// make the buttons function
function createButtons(){ 

		// Empties the button div so you don't have repeat buttons.
		$('.buttonDiv').empty();

		// Loops through the array of foodButtons
		for (var i = 0; i < foodButtons.length; i++){

			// Then dynamicaly generates buttons for each food type in the array
		    var BTN = $('<button type="button" class="btn btn-success" id="foodButton">')
		    // add class
		    BTN.addClass('foodType');
		    // add a data-name attribute , WE WILL USE THIS DATA LATER FOR THE API REQUEST
		    BTN.attr('data-name', foodButtons[i]);
		    // add text to the button
		    BTN.text(foodButtons[i]);
		    // push the buttons to the correct div on the page
		    $('.buttonDiv').append(BTN);
		}

	}


// ========================================================

$(document).on('click', '.image', function(){

var motion = $(this).attr('data-motion');


if (motion == 'false'){
	$(this).attr('src', $(this).data('gif'));
	$(this).attr('data-motion', 'true');
}else{
	$(this).attr('src', $(this).data('still'));
	$(this).attr('data-motion', 'false');
}
console.log($(this).attr('data-motion'));/*this is working, giving me back false*/


});


// ========================================================

	// Generic function for displaying the movieInfo
	$(document).on('click', '#foodButton', getmydata);

// METHODS
// ========================================================

	// This function handles events where my big blue button is clicked
	$('#addFood').on('click', function(){
		
		// This line of code will grab the input from the textbox
		var newButton = $('.form-control').val().trim();
		
		// The food/word from the textbox is then added to the foodButtons array
		foodButtons.push(newButton);
		
		// buttons are now created from the array with new word in the array
		createButtons();

		// clearInput field;
		$('#food-input').val('');

		// users can hit "enter" instead of clicking on the button and it won't move to the next page
		return false;/*This isn't working*/
	});

// ==========================================================

createButtons();