const player1 = {
  score: 0,
};
const player2 = {
  score: 0,
};
//------------------------------------------- Variables

const gameOver = false;
let gameTarget = 1000000;
let currentPlayer = player1;
let otherPlayer = player2;
let winner = "";
let dice1Result = 0;
let dice2Result = 0;
let sumOfDice = 0;

//--------------------------------------
//-----------------------------------------QuerySelector Variables
const rollDiceBtn = document.querySelector("#roll-dice");
const holdBtn = document.querySelector(".hold-btn");
const startGameBtn = document.querySelector("#start-game-btn");
const input = document.querySelector("input");
const modal = document.querySelector(".modal");
const newGameBtn = document.querySelector(".new-game-btn");

const dicePic1 = document.querySelector(".dice1");
const dicePic2 = document.querySelector(".dice2");
const currentRoundSumP1 = document.querySelector(".current-round-p1");
const currentRoundSumP2 = document.querySelector(".current-round-p2");
const totalGameSump1 = document.querySelector(".total-game-sum-p1");
const totalGameSump2 = document.querySelector(".total-game-sum-p2");
const player1Overlay = document.querySelector(".player1-overlay");
const player2Overlay = document.querySelector(".player2-overlay");
const player1InterfaceContainer = document.querySelector(
  ".player1-interface-container"
);
const player2InterfaceContainer = document.querySelector(
  ".player2-interface-container"
);
const player1Heading = document.querySelector(".player1-heading");
const player2Heading = document.querySelector(".player2-heading");
const youWinContainerP1 = document.querySelector(".you-win-container-p1");
const youWinContainerP2 = document.querySelector(".you-win-container-p2");

//-----------------------------Create new Elements----------------------
const youWin = document.createElement("h5");
youWin.textContent = "You Win!";
youWin.style.color = "#941D4A";
youWin.style.marginTop = "30rem";

const passedTargetScore = document.createElement("h5");
passedTargetScore.textContent = "Passed the target score";
passedTargetScore.style.color = "#2F2F2F";
passedTargetScore.style.marginTop = "30rem";

//------------------------------------------------------------------------
//! --------------------------------------------functions ---------------------

const rollDiceFunc = () => {
  dice1Result = Math.floor(Math.random() * 6 + 1);
  dice2Result = Math.floor(Math.random() * 6 + 1);
  sumOfDice = dice1Result + dice2Result;
  dicePic1.style.background = `url(/assets/img/dice-${dice1Result}.png) no-repeat center center/cover`;
  dicePic2.style.background = `url(/assets/img/dice-${dice2Result}.png) no-repeat center center/cover`;
};

const diceToCurrent = (p) => {
  if (p === player1) {
    currentRoundSumP1.textContent =
      parseFloat(currentRoundSumP1.textContent) + sumOfDice;
  } else {
    currentRoundSumP2.textContent =
      parseFloat(currentRoundSumP2.textContent) + sumOfDice;
  }
};

const updateTotalSum = (p) => {
  if (p === player1) {
    player1.score =
      parseFloat(totalGameSump1.textContent) +
      parseFloat(currentRoundSumP1.textContent);
    totalGameSump1.textContent = player1.score;
  } else {
    player2.score =
      parseFloat(totalGameSump2.textContent) +
      parseFloat(currentRoundSumP2.textContent);
    totalGameSump2.textContent = player2.score;
  }
};

const currentToZero = (p) => {
  p === player1
    ? (currentRoundSumP1.textContent = "0")
    : (currentRoundSumP2.textContent = "0");
};

const afterGameOver = () => {
  let winner = "";
  if (player1.score > gameTarget || player2.score === gameTarget) {
    winner = player2;
    player2InterfaceContainer.classList.add("winner");
    player2Heading.innerHTML = `<h1>PLAYER 2</h1>`;
    youWinContainerP2.append(youWin);
    youWinContainerP1.append(passedTargetScore);
  } else {
    winner = player1;
    player1InterfaceContainer.classList.add("winner");
    player1Heading.innerHTML = `<h1>PLAYER 1</h1>`;
    youWinContainerP1.append(youWin);
    youWinContainerP2.append(passedTargetScore);
  }
};

const isGameOver = () => {
  if (
    player1.score > gameTarget ||
    player2.score > gameTarget ||
    player1.score === gameTarget ||
    player2.score === gameTarget
  ) {
    afterGameOver();
    return true;
  }
};

const changePlayer = () => {
  currentPlayer === player1
    ? (currentPlayer = player2)
    : (currentPlayer = player1);
  otherPlayer === player1 ? (otherPlayer = player2) : (otherPlayer = player1);
};

const toggleOverlay = () => {
  player1Overlay.classList.toggle("visibility");
  player2Overlay.classList.toggle("visibility");
};

//! modal
// click event on start game:
startGameBtn.addEventListener("click", function (event) {
  event.preventDefault();
  gameTarget = input.value;
  if (input.value > 20 && input.value < 10000) {
    modal.classList.add("hidden");
  } else {
    //!CHANGE THIS ALERT TO A NORMAL NOTIFICATION!!!!!!!!!!!!!!!!!!!
    alert('hell no')
    input.value = 100;
  }
});

//1. prevent default (no need of page refresh)
//2. target of game is set to the input of the form.
//3. modal is becoming invisible.

//! The game (loop?)

// while (gameOver === false) {
rollDiceBtn.addEventListener("click", function () {
  rollDiceFunc();
  diceToCurrent(currentPlayer);
});
holdBtn.addEventListener("click", function () {
  updateTotalSum(currentPlayer);
  currentToZero(currentPlayer);
  isGameOver();
  changePlayer();
  toggleOverlay();
});
// }
// afterGameOver();

//! New game
newGameBtn.addEventListener("click", function () {
  window.location.reload();
});
