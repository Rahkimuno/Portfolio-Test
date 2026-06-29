document.addEventListener('DOMContentLoaded', () => {
  const rockButton = document.getElementById('rock');
  const paperButton = document.getElementById('paper');
  const scissorsButton = document.getElementById('scissors');
  const playAgainButton = document.getElementById('play-again');
  const userIcon = document.getElementById('user-icon');
  const computerIcon = document.getElementById('computer-icon');
  const resultDisplay = document.getElementById('result');

  // Score elements
  const winsDisplay = document.getElementById('wins');
  const lossesDisplay = document.getElementById('losses');
  const tiesDisplay = document.getElementById('ties');

  // Initialize scores
  let wins = 0;
  let losses = 0;
  let ties = 0;

  // Add event listeners to the buttons
  rockButton.addEventListener('click', () => playGame('rock'));
  paperButton.addEventListener('click', () => playGame('paper'));
  scissorsButton.addEventListener('click', () => playGame('scissors'));
  playAgainButton.addEventListener('click', resetGame);

  // Function to play the game
  function playGame(userChoice) {
    // Show the user's choice
    userIcon.textContent = getIcon(userChoice);
    userIcon.style.opacity = '1';

    // Hide the computer's choice initially
    computerIcon.textContent = '❓';
    computerIcon.style.opacity = '0.5';

    // Disable buttons during animation
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;

    // After a short delay, show the computer's choice
    setTimeout(() => {
      const computerChoice = getComputerChoice();
      computerIcon.textContent = getIcon(computerChoice);
      computerIcon.style.opacity = '1';

      // Determine the result
      const result = determineWinner(userChoice, computerChoice);
      displayResult(result);

      // Update the score
      updateScore(result);

      // Show the play again button
      playAgainButton.style.display = 'inline-block';
    }, 1000);
  }

  // Function to get the computer's choice
  function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  }

  // Function to get the icon for a choice
  function getIcon(choice) {
    switch (choice) {
      case 'rock':
        return '🪨';
      case 'paper':
        return '📄';
      case 'scissors':
        return '✂️';
      default:
        return '❓';
    }
  }

  // Function to determine the winner
  function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
      return 'tie';
    }

    if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      return 'win';
    } else {
      return 'lose';
    }
  }

  // Function to display the result
  function displayResult(result) {
    switch (result) {
      case 'win':
        resultDisplay.textContent = 'You Win!';
        resultDisplay.className = 'rps-result win';
        break;
      case 'lose':
        resultDisplay.textContent = 'You Lose!';
        resultDisplay.className = 'rps-result lose';
        break;
      case 'tie':
        resultDisplay.textContent = 'It\'s a Tie!';
        resultDisplay.className = 'rps-result tie';
        break;
    }
  }

  // Function to update the score
  function updateScore(result) {
    switch (result) {
      case 'win':
        wins++;
        winsDisplay.textContent = wins;
        break;
      case 'lose':
        losses++;
        lossesDisplay.textContent = losses;
        break;
      case 'tie':
        ties++;
        tiesDisplay.textContent = ties;
        break;
    }
  }

  // Function to reset the game
  function resetGame() {
    userIcon.textContent = '❓';
    userIcon.style.opacity = '0.5';
    computerIcon.textContent = '❓';
    computerIcon.style.opacity = '0.5';
    resultDisplay.textContent = 'Make your choice!';
    resultDisplay.className = 'rps-result';
    playAgainButton.style.display = 'none';
    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorsButton.disabled = false;
  }
});