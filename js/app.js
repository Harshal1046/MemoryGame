/*
 * DOM Selectors
 */

document.addEventListener("DOMContentLoaded", initGame, true);

document.querySelector(".restart").addEventListener("click", function() {
   initGame();
}, true);

const deck = document.getElementById("deck");

const stars = document.querySelectorAll(".fa-star");

let finalStars = 3;

const mainContainer = document.querySelector(".container");
const modalContainer = document.querySelector(".modal");

const moves = document.querySelector(".moves");

let _openedCard = null;

let matchesCounter = 0;

let seconds = 0, minutes = 0, hours = 0, t;

let spanTimer = document.querySelector(".timer");


// Shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//   To Initialize New Game

function initGame() {
	resetGame();

	const cards = deck.querySelectorAll(".card");

	const suffledCards = shuffle(Array.from(cards));

	deck.innerText = '';

	for (let i = 0; i < suffledCards.length; i++) {
		let card = suffledCards[i];

		card.classList.remove("show", "open", "match", "cardMatched", "shake");
		card.addEventListener("click", flipCard, true);
		deck.appendChild(card);
	}
}


// to restart Game

function resetGame() {
	clearTimeout(t);
	spanTimer.textContent = "00:00:00";
	seconds = 0, minutes = 0, hours = 0;
	timer();

	mainContainer.classList.remove("hidden");
	modalContainer.classList.add("hidden");

	moves.textContent = "0";

	stars[1].classList.add("fa-star");
	stars[1].classList.remove("fa-star-o");
	stars[2].classList.add("fa-star");
	stars[2].classList.remove("fa-star-o");

	_openedCard = null;

	matchesCounter = 0;
}



//  For Fliping Clicked Card


function flipCard(evt) {
	const currentMoves = +moves.textContent;

	const card = evt.target;

	card.classList.add("open", "show");

	if (!_openedCard) {
		_openedCard = card;
	} 
	else {
		deck.classList.add("disabled");
		moves.textContent = currentMoves + 1;

		if (_openedCard.classList[1] === card.classList[1]) {
			setTimeout(function() {
				card.classList.add("match", "cardMatched");
				_openedCard.classList.add("match", "cardMatched");

				_openedCard.classList.remove("open", "show");
				card.classList.remove("open", "show");

				_openedCard = null;

				matchesCounter += 1;

				toggleStars();

				if (matchesCounter === 8) {
					showResult();
				}
				
				deck.classList.remove("disabled");
			}, 100);
		} 
		else {
			_openedCard.classList.add("wrong", "shake");
			card.classList.add("wrong", "shake");

			setTimeout(function() {
				_openedCard.classList.remove("open", "show", "wrong", "shake");
				card.classList.remove("open", "show", "wrong", "shake");

				_openedCard = null;

				deck.classList.remove("disabled");
			}, 500);
		}
	}
}


//    Final Stars Depending On result

function toggleStars() {
	if (matchesCounter === 3) {
		stars[2].classList.remove("fa-star");
		stars[2].classList.add("fa-star-o");
		finalStars = 2;
	} else if (matchesCounter === 6) {
		stars[1].classList.remove("fa-star");
		stars[1].classList.add("fa-star-o");
		finalStars = 1;
	}
}


//   Result 

function showResult() {
	const finalMoves = moves.textContent;
	const finalTime = spanTimer.textContent;

	const finalMovesSpan = document.getElementById("finalMoves");

	const finalStarsSpan = document.getElementById("finalStars");

	const finalTimeSpan = document.getElementById("finalTime");

	finalMovesSpan.textContent = finalMoves;
	finalStarsSpan.textContent = finalStars;
	finalTimeSpan.textContent = finalTime;

	clearTimeout(t);

	mainContainer.classList.add("hidden");
	modalContainer.classList.remove("hidden");
}


//  Timer

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    spanTimer.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}