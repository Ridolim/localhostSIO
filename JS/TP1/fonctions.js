let guessMaxSubmit = document.querySelector("#guessMaxSubmit");
let guessMaxField = document.querySelector("#guessMaxField");
let frmGuessMax = document.querySelector("#frmGuessMax");

let guesses = document.querySelector(".guesses");
let lastResult = document.querySelector(".lastResult");
let lowOrHi = document.querySelector(".lowOrHi");

let labelGuess = document.querySelector("#frmGame label");
let guessSubmit = document.querySelector("#guessSubmit");
let guessField = document.querySelector("#guessField");
let frmGame = document.querySelector("#frmGame");

let reset = document.querySelector(".reset")

let guessCount = 1;
let allGuesses = "";
let resetButton;
let randomNumber = 0;
let userGuessMax = 0;
let gameResult = false;
let nbWin = 0;
let nbLose = 0;

let score = document.querySelector(".userScore");

function prepGame(){
  userGuessMax = Number(guessMaxField.value);
  if (userGuessMax > 0){
    randomNumber = Math.floor(Math.random() * userGuessMax) + 1;
    frmGuessMax.style.display = "none";
    frmGame.style.display = "block";
    labelGuess.textContent = "Test un nombre entre 1 et " + userGuessMax + " :";
    lastResult.textContent ="",
    lastResult.style.backgroundColor = "white";
    guessField.focus();
  }else{
    lastResult.textContent = "Choisi un nombre valide, entier, positif et non nul.";
    lastResult.style.backgroundColor = "red";
    guessMaxField.focus();
  }
}
guessMaxSubmit.addEventListener("click", prepGame);

function checkGuess() {
  let userGuess = Number(guessField.value);
  allGuesses = userGuess + " " + allGuesses;
  guesses.textContent = "Propositions précédentes : " + allGuesses;
  
  if (userGuess === randomNumber) {
    lastResult.textContent = "Bravo, vous avez trouvé le nombre !";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    allGuesses = "";
    gameResult = true;
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "Dommage, vous n'avez pas trouvé le nombre en moins de 10 essais...";
    allGuesses = "";
    gameResult = false;
    setGameOver();
  } else {
    lastResult.textContent = "Faux !";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Le nombre saisi est trop petit !";
      lowOrHi.style.color = "GoldenRod";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Le nombre saisi est trop grand !";
      lowOrHi.style.color = "blue";
    }
  }
  guessCount++;
  guessField.value = "";
  guessField.focus();
}
guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
  if (gameResult === true){
    nbWin ++;
  }else{
    nbLose ++;
  }
  score.textContent = "Parties gagnée(s)/perdue(s): " + nbWin + "/" + nbLose;
  
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  document.body.appendChild(resetButton);
  resetButton.addEventListener("click", resetGame);
}
function resetGame() {
  guessCount = 1;
  
  let resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = "";
  }
  
  resetButton.parentNode.removeChild(resetButton);
  
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  frmGame.style.display = "none";
  frmGuessMax.style.display = "block";
  guessMaxField.value = "";
  guessMaxField.focus();
  lastResult.style.backgroundColor = "white";
}