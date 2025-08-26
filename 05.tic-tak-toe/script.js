let newGameBtn = document.querySelector(".new-game");
let resetGameBtn = document.querySelector(".reset-game");
let boxes = document.querySelectorAll(".box");
let playerX = document.querySelector("#x-wins");
let playerO = document.querySelector("#o-wins");
let drawGame = document.querySelector("#draws");
let turnIndicator = document.querySelector("#turn-indicator");
let turnO = true;
let xWins = 0,
  oWins = 0,
  draws = 0;
let winner = null;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Disable Buttons
const disableBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Enable Buttons and remove the textContent
const enableBtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.textContent = "";
  }
};

const updateTurnIndicator = () => {
  if (winner) {
    turnIndicator.textContent = `Player ${winner} Wins!`;
    turnIndicator.style.color = winner === "O" ? "green" : "red";
  } else if ([...boxes].every((box) => box.textContent !== "")) {
    turnIndicator.textContent = "It's a Draw!";
    turnIndicator.style.color = "black";
  } else {
    turnIndicator.textContent = turnO ? "Player O's Turn" : "Player X's Turn";
    turnIndicator.style.color = turnO ? "green" : "red";
  }
};

// Make a newGame with maintaining the scores
const newGame = () => {
  enableBtn();

  // Gives first turn to the 
  if (winner === "X") {
    turnO = false; 
  } else if (winner === "O") {
    turnO = true;
  } else {
    turnO = !turnO;
  }
  winner = null;
  updateTurnIndicator();
};

// Reset the Game and scores
const resetGame = () => {
  enableBtn();
  turnO = true;
  winner = null;

  playerO.textContent = `Player O:`;
  playerX.textContent = `Player X:`;
  drawGame.textContent = `Draws:`;

  oWins = 0;
  xWins = 0;
  draws = 0;
  
  updateCounters();
  updateTurnIndicator();
};

// Display couneter after every game
const updateCounters = () => {
  playerO.textContent = `Player O: ${oWins}`;
  playerX.textContent = `Player X: ${xWins}`;
  drawGame.textContent = `Draws: ${draws}`;
};

// Calculate values for the counter
function resultCounter(winner) {
  if (winner) {
    console.log(`Winner: ${winner}`);
    disableBtn();

    if (winner === "O") {
      oWins++;
      console.log(oWins, "owins");
    } else if (winner === "X") {
      xWins++;
      console.log(xWins, "xwins");
    }
  } else if ([...boxes].every((box) => box.textContent !== "")) {
    console.log("It's a draw!");
    draws++;
  }

  updateCounters();
}

// Check for the winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].textContent;
    let pos2 = boxes[pattern[1]].textContent;
    let pos3 = boxes[pattern[2]].textContent;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        winner = pos1;
        break;
      }
    }
  }
  resultCounter(winner);
};

// Change turn after each click
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.textContent = "O";
      turnO = false;
    } else {
      box.textContent = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
    updateTurnIndicator();
  });
});

// event for buttons
resetGameBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", newGame);
