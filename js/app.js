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


// Shuffle the list of cards function from http://stackoverflow.com/a/2450976
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

// Loop through each card and create its HTML <li> after shuffle the card.
function add_list(list) {
    "use strict";
    for (var i = 0; i < list.length; i++) {
        $("#cards").append("<li class='card'><i class='fa " + list[i] + "'></i></li>");
    }

}


function score_ratings(moves, matched, the_timer,finished_time) {
    "use strict";
    var all_stars = $(".stars");
    if (matched === 8) {

		console.log(finished_time);
		$("#timer").text(finished_time);
        clearInterval(the_timer);
        
		
		setTimeout(function(){ alert("Congratulations! You've won the game!"); }, 1500);
        
    } else {
        if ((moves > 12) && (moves <= 15)) {
            all_stars.children().remove("li");
            all_stars.append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star-o'></i></li>"); // Two stars

        } else if (moves > 17) {
            all_stars.children().remove("li");
            all_stars.append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star-o'></i></li><li><i class='fa fa-star-o'></i></li>"); // A star
        }
    }
}


function reset_game(the_timer) {
    "use strict";
    $(".fa-repeat").click(function() {
		$("ul#cards").children().remove("li"); // RESET CRAD
        $(".stars").children().remove("li");
        $(".stars").append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>"); // RESET stars
        $(".moves").text("0"); // RESET Moves
        clearInterval(the_timer);
        $("#timer").text("0.000"); // RESET timer
        startGame();
    });
}

function startGame() {
    "use strict";
    list = shuffle(list);
    add_list(list);

	// Initial parameters
    var previous_card_selector = "";
    var previous_card_icon = "";
    var move_count = 0;
    var card_selected = false;
    var timer = 0;
    var the_timer;
    var matched = 0;
	var finished_time = 0;

    $(".card").on("click", function() {
        timer++; // This will activate the timer/stopwatch
        var current_card = $(this).attr("class");
        var current_card_icon = $(this).children().attr("class");

        // Card matching logics and set up the event listener for a card. If a card is clicked
        if (current_card === "card") {
            if ((current_card_icon === previous_card_icon) && (card_selected === true)) {
                //if both cards matched, lock the cards in the open position 
                $(this).addClass("match");
                previous_card_selector.removeClass("open show").addClass("match");
                card_selected = false;
                matched++;
                move_count++;

            } else if ((card_selected === true)) {
                // if the cards do not match, lock the cards in the open position and disable opening others card. Then, remove the cards from the list, hide the card's symbol and reactive ability to click others card.
                $(this).addClass("open show");
                $(".card").addClass("disabled");
                setTimeout(function() {
                    $(".open.show").removeClass("open show");
                    $(".card").removeClass("disabled");
                }, 800);
                card_selected = false;
                move_count++;

            } else {
                // Default click and show the card
                $(this).addClass("open show");
                previous_card_icon = current_card_icon;
                previous_card_selector = $(this);
                card_selected = true;
            }

            // Updating move count to web pages
            $(".moves").text(move_count);

            // Ratings from 3 stars to 1 stars
            score_ratings(move_count, matched, the_timer,finished_time);

            // TIMER function
            if (timer === 1) {
                var startTime = Date.now();
                the_timer = setInterval(function() {
                    var elapsedTime = Date.now() - startTime;
					finished_time = (elapsedTime / 1000).toFixed(3);
                    $("#timer").text(finished_time);
                }, 44);

            }

            // RESET FUNCTION 
            reset_game(the_timer);
        }

    });
}

startGame();