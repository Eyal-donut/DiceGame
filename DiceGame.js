//--------------------------------------------------Players objects------------------------------------------------
const player1 = {
  score: 0,
};
const player2 = {
  score: 0,
};
//------------------------------------------------ Global variables-------------------------------------------------

let gameTarget = 10001;
let currentPlayer = player1;
let otherPlayer = player2;
let winner = "";
let dice1Result = 0;
let dice2Result = 0;
let sumOfDice = 0;

//-----------------------------------------QuerySelector Variables general----------------------------------------

const rollDiceBtn = document.querySelector("#roll-dice");
const holdBtn = document.querySelector(".hold-btn");
const startGameBtn = document.querySelector("#start-game-btn");
const input = document.querySelector("input");
const modal = document.querySelector(".modal");
const newGameBtn = document.querySelector(".new-game-btn");
const ParentOfFailAlert = document.querySelector("h3.select-target-score");

//-----------------------------------------QuerySelector Variables player 1--------------------------------------

const dicePic1 = document.querySelector(".dice1");
const currentRoundSumP1 = document.querySelector(".current-round-p1");
const totalGameSump1 = document.querySelector(".total-game-sum-p1");
const player1Overlay = document.querySelector(".player1-overlay");
const player1InterfaceContainer = document.querySelector(
  ".player1-interface-container"
);

//-----------------------------------------QuerySelector Variables player 2---------------------------------------

const dicePic2 = document.querySelector(".dice2");
const currentRoundSumP2 = document.querySelector(".current-round-p2");
const totalGameSump2 = document.querySelector(".total-game-sum-p2");
const player2Overlay = document.querySelector(".player2-overlay");

const player1Heading = document.querySelector(".player1-heading");
const player2Heading = document.querySelector(".player2-heading");
const youWinContainerP1 = document.querySelector(".you-win-container-p1");
const youWinContainerP2 = document.querySelector(".you-win-container-p2");
const player2InterfaceContainer = document.querySelector(
  ".player2-interface-container"
);

//----------------------------------------------- create new element---------------------------------------------

const youWin = document.createElement("h5");
youWin.textContent = "You Win!";
youWin.style.color = "#941D4A";
youWin.style.marginTop = "30rem";

const passedTargetScore = document.createElement("h5");
passedTargetScore.textContent = "Passed the target score";
passedTargetScore.style.color = "#2F2F2F";
passedTargetScore.style.marginTop = "30rem";

const failAlert = document.createElement("h4");
failAlert.classList.add("error");
failAlert.innerText = "*Please select a number between 20 to 10000";

//! ------------------------------------------------------functions --------------------------------------------

const rollDiceFunc = () => {
  dice1Result = Math.floor(Math.random() * 6 + 1);
  dice2Result = Math.floor(Math.random() * 6 + 1);
  sumOfDice = dice1Result + dice2Result;
  dicePic1.style.background = `url(/assets/img/dice-${dice1Result}.png) no-repeat center center/cover`;
  dicePic2.style.background = `url(/assets/img/dice-${dice2Result}.png) no-repeat center center/cover`;
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
    player2Heading.innerHTML = `<h6>PLAYER 2</h6>`;
    youWinContainerP2.append(youWin);
    youWinContainerP1.append(passedTargetScore);
  } else {
    winner = player1;
    player1InterfaceContainer.classList.add("winner");
    player1Heading.innerHTML = `<h6>PLAYER 1</h6>`;
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

const diceToCurrent = (p) => {
  if (p === player1) {
    currentRoundSumP1.textContent =
      parseFloat(currentRoundSumP1.textContent) + sumOfDice;
  } else {
    currentRoundSumP2.textContent =
      parseFloat(currentRoundSumP2.textContent) + sumOfDice;
  }
  if (sumOfDice === 12) {
    currentToZero(currentPlayer);
    changePlayer();
    toggleOverlay();
  }
};

//!------------------------------------------------------Modal ----------------------------------------------------

startGameBtn.addEventListener("click", function (event) {
  event.preventDefault();
  gameTarget = input.value;
  if (input.value > 20 && input.value < 10000) {
    modal.classList.add("hidden");
  } else {
    ParentOfFailAlert.append(failAlert);
    input.value = 100;
  }
});

//! ----------------------------------------------------The game--------------------------------------------------

rollDiceBtn.addEventListener("click", function () {
  if (!isGameOver()) {
    holdBtn.disabled = false;
    rollDiceFunc();
    diceToCurrent(currentPlayer);
  }
});
holdBtn.addEventListener("click", function () {
  if (!isGameOver()) {
    holdBtn.disabled = true;
    updateTotalSum(currentPlayer);
    currentToZero(currentPlayer);
    isGameOver();
    changePlayer();
    toggleOverlay();
  }
});

newGameBtn.addEventListener("click", function () {
  window.location.reload();
});

