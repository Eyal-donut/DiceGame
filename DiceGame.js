//! variables
const player1 = {
//   isPlaying: true, /// I changed the command to current player
  score: 0,
};
const player2 = {
//   isPlaying: false, // I changed the command to current player
  score: 0,
};

const gameOver = false;
const rollDiceBtn = document.querySelector("#roll-dice");
let gameTarget = 0;
let currentPlayer = player1;
let otherPlayer = player2;
let winner = '';

//! functions
const changePlayer = () => {
    currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
    otherPlayer === player1 ? otherPlayer = player2 : otherPlayer = player1;
};

const rollDiceFunc = "";
const diceToCurrent = "";
const totalSum = ""; //adding the current to the total.
const isGameOver = "";
const announceWinner = ""; // this function changes the background color to winner, and says you win.
const toggleOverlay = "";

//! modal
// click event on start game:
//1. prevent default (no need of page refresh)
//2. target of game is set to the input of the form.
//3. modal is becoming invisible.

//! Game set up

//entering the gameloop: while not game over, loop is running
while (!gameOver) {
  //eventListener - currentPlayer clicks the rolldice button
  rollDiceBtn.addEventListener("click", (event) => {
    //function activated - rollDiceFunc
    //the numbers that are shown will change the photos of the dice.
    //function called: diceToCurrent: sum of dice is added current of player

    //eventListener - currentPlayer  clicks the hold button
    //function activated totalSum. current is added to total
    //function activated: isGameOver: if current of player === gameTarget, currentPlayer wins, if current > gameTarget, otherPlayer win. activate function announceWinner. gameOver. else do nothing.
    //changePlayer function is called.
    //toggle overlay function is called: screens overlay change
  });
};