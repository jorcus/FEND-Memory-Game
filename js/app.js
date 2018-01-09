/*
 * Create a list that holds all of your cards
 */
var list = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-anchor",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
    "fa-leaf",
    "fa-bomb",
    "fa-bolt",
    "fa-bicycle",
    "fa-paper-plane-o",
    "fa-cube"
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    "use strict";
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Append the <li> after shuffle the card.
function add_list(list) {
    "use strict";
    $("ul#cards").children().remove("li"); // FOR RESET THE GAME
    for (var i = 0; i < list.length; i++) {
        $("#cards").append("<li class='card'><i class='fa " + list[i] + "'></i></li>");
    }

}

function click_card() {
    "use strict";

    var previous_card_selector = "";
    var previous_card_icon = "";
    var move_count = 0;
    var card_selected = false;
	
	$(".moves").text(move_count); // FOR RESET THE GAME
	
	
    $(".card").on("click", function() {
        var current_card = $(this).attr("class");
        var current_card_icon = $(this).children().attr("class");

		
		// Card matching logics and set up the event listener for a card. If a card is clicked
        if (current_card === "card") {
            if ((current_card_icon === previous_card_icon) && (card_selected === true)) {  //if both cards matched, lock the cards in the open position 
                $(this).addClass("match");
                previous_card_selector.removeClass("open show").addClass("match");
                card_selected = false;
				move_count ++;

            } else if ((card_selected === true)) {
				// if the cards do not match, lock the cards in the open position and disable opening others card. Then, remove the cards from the list, hide the card's symbol and reactive ability to click others card.
                $(this).addClass("open show");
				$(".card").addClass("disabled");
                setTimeout(function() {
                    $(".open.show").removeClass("open show");
					$(".card").removeClass("disabled");
                }, 800);
                card_selected = false;
				move_count ++;

            } else {
				// Default click and show the card
				
                $(this).addClass("open show");
                previous_card_icon = current_card_icon;
                previous_card_selector = $(this);
                card_selected = true;
				
            }

			$(".moves").text(move_count);
        }
		
		
		
    });
}


function startGame() {
    "use strict";
    list = shuffle(list);
    add_list(list);
    click_card();
}


startGame();
$(".fa-repeat").click(function() {
    "use strict";
    startGame();
});



/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */