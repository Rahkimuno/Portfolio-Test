document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('maze');
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');
  const statusText = document.getElementById('status');

  // Maze layout (0 = wall, 1 = path, 2 = start, 3 = goal)
  const maze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  // Player properties (updated color to #980101)
  let player = {
    x: 0,
    y: 0,
    size: 20,
    color: '#980101'  // Dark red color
  };

  // Game state
  let gameStarted = false;
  let gameWon = false;

  // Initialize the game
  function initGame() {
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === 2) {
          player.x = x * 40 + 20;
          player.y = y * 40 + 20;
          return;
        }
      }
    }
  }

  // Draw the maze
  function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === 0) {
          ctx.fillStyle = '#333';
          ctx.fillRect(x * 40, y * 40, 40, 40);
        } else if (maze[y][x] === 1 || maze[y][x] === 2 || maze[y][x] === 3) {
          ctx.fillStyle = '#fff';
          ctx.fillRect(x * 40, y * 40, 40, 40);
        }
      }
    }

    // Draw the start (2) and goal (3) with updated goal color #fce209
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === 2) {
          ctx.fillStyle = '#4CAF50';
          ctx.fillRect(x * 40 + 10, y * 40 + 10, 20, 20);
        } else if (maze[y][x] === 3) {
          ctx.fillStyle = '#fce209';  // Bright yellow color
          ctx.fillRect(x * 40 + 10, y * 40 + 10, 20, 20);
        }
      }
    }
  }

  // Draw the player
  function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
  }

  // Check if the player has reached the goal
  function checkWin() {
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === 3) {
          const goalX = x * 40 + 20;
          const goalY = y * 40 + 20;
          const distance = Math.sqrt((player.x - goalX) ** 2 + (player.y - goalY) ** 2);
          return distance < player.size / 2;
        }
      }
    }
    return false;
  }

  // Handle keyboard input with WASD
  document.addEventListener('keydown', (e) => {
    if (!gameStarted || gameWon) return;

    const step = 5;
    let newX = player.x;
    let newY = player.y;

    switch (e.key.toLowerCase()) {
      case 'w':
        newY -= step;
        break;
      case 's':
        newY += step;
        break;
      case 'a':
        newX -= step;
        break;
      case 'd':
        newX += step;
        break;
      default:
        return; // Ignore other keys
    }

    // Check if the new position is valid
    const gridX = Math.floor(newX / 40);
    const gridY = Math.floor(newY / 40);

    if (maze[gridY] && maze[gridY][gridX] !== 0) {
      player.x = newX;
      player.y = newY;
    }

    // Check if the player has won
    if (checkWin()) {
      gameWon = true;
      statusText.textContent = 'You Win! 🎉';
      statusText.style.color = 'green';
    }
  });

  // Start the game
  startBtn.addEventListener('click', () => {
    if (!gameStarted) {
      gameStarted = true;
      gameWon = false;
      initGame();
      statusText.textContent = 'Use WASD keys to navigate!';
      statusText.style.color = 'black';
    }
  });

  // Reset the game
  resetBtn.addEventListener('click', () => {
    gameStarted = false;
    gameWon = false;
    initGame();
    statusText.textContent = 'Press "Start Game" to begin!';
    statusText.style.color = 'black';
    drawMaze();
    drawPlayer();
  });

  // Initialize the game
  initGame();
  drawMaze();
  drawPlayer();
});
