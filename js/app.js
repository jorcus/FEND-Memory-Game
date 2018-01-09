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
	$("ul#cards").children().remove("li"); // RESET THE GAME
    for (var i = 0; i < list.length; i++) {
        $("#cards").append("<li class='card'><i class='fa " + list[i] + "'></i></li>");
    }
	
}


function click_card() {
    "use strict";
	
    var previous_card_selector = "";
    var previous_card_icon = "";
	//var move_count = 0;
    $(".card").on("click", function() {

        var current_card = $(this).attr("class");
        var current_card_icon = $(this).children().attr("class");


        if (current_card === "card") {
            if (current_card_icon === previous_card_icon) {
                $(this).addClass("match");
                previous_card_selector.removeClass("open show").addClass("match");


            } else {
                $(this).addClass("open show");
                previous_card_icon = current_card_icon;
                previous_card_selector = $(this);
            }
        } else {
            $(this).removeClass("open show");
            previous_card_icon = current_card_icon;
            previous_card_selector = $(this);
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
$(".fa-repeat").click(function(){
	"use strict";
    startGame();
});
	


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */