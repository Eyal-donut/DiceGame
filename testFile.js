const rollDiceFunc = () => {
    return Math.floor(Math.random()*6 + 1)
}
console.log(rollDiceFunc())


//eventListener - currentPlayer  clicks the hold button
//function activated totalSum. current is added to total
//function activated: isGameOver: if current of player === gameTarget, currentPlayer wins, if current > gameTarget, otherPlayer win. activate function announceWinner. gameOver. else do nothing.
//changePlayer function is called.
//toggle overlay function is called: screens overlay change