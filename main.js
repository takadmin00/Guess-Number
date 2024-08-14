import "./styles.scss";

document.getElementById("gameStart").addEventListener("click", function () {
  document.getElementById("initialElements").style.display = "none";
  document.getElementById("gameElements").style.display = "block";
});
document.addEventListener("DOMContentLoaded", function () {
  initializeGame();
});

// Utils
function generateRandomNumber() {
  return Math.floor(Math.random() * 501);
}

function isValidGuess(guess) {
  return !isNaN(guess) && guess >= 0 && guess <= 500;
}

function initializeGame() {
  const numberInput = document.getElementById("number");
  const submitButton = document.getElementById("submitButton");
  const attemptsDisplay = document.getElementById("attemptsDisplay");
  const tooSmallColumn = document.getElementById("tooSmallColumn");
  const tooLargeColumn = document.getElementById("tooLargeColumn");
  const messageDisplay = document.getElementById("messageDisplay");
  const popup = document.getElementById("success-box");
  const previousWrongAttemptsDisplay = document.getElementById(
    "previousWrongAttempts"
  );

  let attemptsCounter = 0;
  let previousWrongAttempts = [];
  let randomNumber = generateRandomNumber();

  function handleIncorrectGuess(userGuess) {
    if (!previousWrongAttempts.includes(userGuess)) {
      previousWrongAttempts.push(userGuess);

      const listItem = document.createElement("li");
      listItem.textContent = `${userGuess}`;

      if (userGuess < randomNumber) {
        tooSmallColumn.appendChild(listItem);
      } else {
        tooLargeColumn.appendChild(listItem);
      }
    }

    messageDisplay.innerText = `The number entered is too ${
      userGuess < randomNumber ? "small" : "big"
    }!`;
    numberInput.value = "";
  }

  function resetGame() {
    resetGameData();
    updateDisplay();
    resetColumns();
  }

  function resetColumns() {
    tooSmallColumn.innerText = "";
    tooLargeColumn.innerText = "";
  }

  function resetGameData() {
    randomNumber = generateRandomNumber();
    attemptsCounter = 0;
    previousWrongAttempts = [];
  }

  function updateDisplay() {
    attemptsDisplay.textContent = `Attempt: ${attemptsCounter}`;
    previousWrongAttemptsDisplay.textContent =
      "Previous wrong attempts: " + previousWrongAttempts;
    numberInput.value = "";
    document.getElementById("messageDisplay").textContent = "";
  }

  submitButton.addEventListener("click", function () {
    const userGuess = parseInt(numberInput.value, 10);

    if (!isValidGuess(userGuess)) {
      messageDisplay.textContent =
        "Please enter valid number between 0 and 500.";
      return;
    }

    attemptsCounter++;
    attemptsDisplay.textContent = `Attempt${
      attemptsCounter <= 1 ? "" : "s"
    }: ${attemptsCounter}`;

    if (userGuess !== randomNumber) {
      handleIncorrectGuess(userGuess);
      return;
    }

    displayVictoryMessage();
  });
  function displayVictoryMessage() {
    const messageVictory = document.getElementById("messageVictory");
    messageVictory.innerText = `You found the number in ${attemptsCounter} tr${
      attemptsCounter <= 1 ? "y" : "ies"
    }!`;
    popup.style.display = "block";
  }

  function restartGame() {
    popup.style.display = "none";
    resetGame();
  }

  numberInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      submitButton.click();
    }
  });

  document.getElementById("restartGame").addEventListener("click", restartGame);
}
