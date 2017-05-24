console.log("Up and running!");

var cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];
var cardsInPlay = [];
var gameBoard, resetButton;

document.addEventListener("DOMContentLoaded", function(){
  	//"start" to the app
	gameBoard = document.getElementById('game-board');
	resetButton = document.getElementById('reset-button');
	resetButton.addEventListener("click", resetBoard);
  	createBoard();
});

var flipBack = function(){
  	var clickedCards = document.getElementsByClassName("clicked"); //clickedCards is a nodeList
	for (var i = clickedCards.length-1; i >= 0; i-=1){
		clickedCards[i].setAttribute("src","images/back.png");
      	clickedCards[i].className = "";
	}
  	cardsInPlay = [];
}


var checkForMatch = function() {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		alert("You found a match!");
      	//reset board or keep going?
      	resetBoard();
	} else {
		alert("Sorry try again.");
      	flipBack(); //turn over clicked cards
	}
}

//Added setTimeout to make cards flip before alert shows
var flipCard = function() {
	var cardId = this.getAttribute('data-id');
	var card = cards[cardId];
	this.setAttribute('src', card.cardImage);
	this.setAttribute("class", "clicked"); //another method: this.className = "clicked";
	cardsInPlay.push(card.rank);
	if (cardsInPlay.length === 2) {
      	//delay the alert message 1/10th of a second
      	setTimeout(checkForMatch, 100);
		//checkForMatch();
	}
}

//Randomize board creation
var createBoard = function() {
    //randomize cards
  	var shuffled = [];
  	while(cards.length){
      	//pick a card at random
      	//Math.random() gives number bet 0 (inclusive) and 1 (exclusive) to 10(?) decimal places
      	//Math.floor() drops all fractions
      	//below will randomly pick 0, 1, 2, or 3 (first time around)
      	//and will continue to pick random cards until there are no more cards to pick
      	var randomize = Math.floor(Math.random() * cards.length); //random index
    	shuffled.push(cards.splice(randomize, 1)[0]); //remove card from cards, push to shuffled
    }
  	//after the while loop, shuffled has all the cards; give them back to cards array
  	cards = shuffled;
  	//add cards to DOM
	for (var i = 0; i < cards.length; i ++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		gameBoard.appendChild(cardElement);
	}
}

var resetBoard = function() {
  	cardsInPlay = [];
  	gameBoard.innerHTML = ""; //the fastest way of removing all elements in a parent element
	createBoard();
}

//createBoard();
//resetButton.addEventListener("click", resetBoard);