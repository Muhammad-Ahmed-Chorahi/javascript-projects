let userScore = 0,
  compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScoreScreen=document.querySelector('#user-score');
const compScoreScreen= document.querySelector('#computer-score');


choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

const playGame = (userChoice) => {
  //Generate computer choice
  const compChoice = getComputerChoice();

  if (userChoice === compChoice) {
    //draw Game
    drawGame(userChoice, compChoice);
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScoreScreen.textContent=userScore;
    msg.textContent = `You Win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScoreScreen.textContent=compScore;
    msg.textContent = `Computer Win! ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const drawGame = (userChoice, compChoice) => {
  msg.textContent = `Game Draw! ${compChoice} is same as ${userChoice}`;
  msg.style.backgroundColor = "darkblue";
};

const getComputerChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};
