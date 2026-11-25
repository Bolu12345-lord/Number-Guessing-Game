// Number Guessing Game
// Developer: OLUFEMI BOLUWATIFE | Matric No: 240404010067

const MIN = 1;
const MAX = 100;
const MAX_TRIES = 7;

const form = document.getElementById("guessForm");
const input = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const newGameBtn = document.getElementById("newGameBtn");
const message = document.getElementById("message");
const rangeText = document.getElementById("range");
const triesLeftText = document.getElementById("triesLeft");
const historyList = document.getElementById("history");

let secret = 0;
let triesLeft = MAX_TRIES;
let low = MIN;
let high = MAX;
let guesses = [];
let gameOver = false;

function randomNumber() {
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

function setMessage(text, type) {
  message.textContent = text;
  message.className = "message" + (type ? " is-" + type : "");
}

function updateRange() {
  rangeText.textContent = `Between ${low} and ${high}`;
}

function addToHistory(value, type) {
  const li = document.createElement("li");
  li.textContent = value;
  li.className = "is-" + type;
  historyList.appendChild(li);
}

function endGame() {
  gameOver = true;
  input.disabled = true;
  guessBtn.disabled = true;
  newGameBtn.focus();
}

function newGame() {
  secret = randomNumber();
  triesLeft = MAX_TRIES;
  low = MIN;
  high = MAX;
  guesses = [];
  gameOver = false;

  historyList.innerHTML = "";
  triesLeftText.textContent = triesLeft;
  input.disabled = false;
  guessBtn.disabled = false;
  input.value = "";
  updateRange();
  setMessage("Type a number and press Guess.");
  input.focus();
}

function handleGuess(event) {
  event.preventDefault();
  if (gameOver) return;

  const value = Number(input.value);

  // Validate
  if (input.value.trim() === "" || !Number.isInteger(value) || value < MIN || value > MAX) {
    setMessage(`Enter a whole number from ${MIN} to ${MAX}.`, "error");
    input.select();
    return;
  }
  if (guesses.includes(value)) {
    setMessage(`You already guessed ${value}. Try a different number.`, "error");
    input.select();
    return;
  }

  guesses.push(value);
  triesLeft--;
  triesLeftText.textContent = triesLeft;

  if (value === secret) {
    addToHistory(value, "win");
    const used = MAX_TRIES - triesLeft;
    setMessage(`Correct! The number was ${secret}. You got it in ${used} ${used === 1 ? "try" : "tries"}.`, "win");
    endGame();
    return;
  }

  if (value < secret) {
    low = Math.max(low, value + 1);
    addToHistory(value, "low");
    setMessage(`${value} is too low. Go higher.`, "low");
  } else {
    high = Math.min(high, value - 1);
    addToHistory(value, "high");
    setMessage(`${value} is too high. Go lower.`, "high");
  }
  updateRange();

  if (triesLeft === 0) {
    setMessage(`Game over! The number was ${secret}.`, "lose");
    endGame();
    return;
  }

  input.value = "";
  input.focus();
}

form.addEventListener("submit", handleGuess);
newGameBtn.addEventListener("click", newGame);

// Start the first game
newGame();