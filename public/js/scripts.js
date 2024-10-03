document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const context = canvas.getContext('2d');

  const canvasWidth = 400;
  const canvasHeight = 400;
  const blockSize = 20;
  const initialSnakeLength = 5;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  let snake = [];
  let direction = 'right';
  let gameInterval;
  let apple = {};
  let score = 0;
  let timer = 0;
  let timerInterval;

  const scoreElement = document.getElementById('score');
  const timerElement = document.getElementById('timer');

  // Initialize snake
  for (let i = initialSnakeLength - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
  }

  // Place the first apple
  placeApple();

  // Render the snake and apple on the canvas
  function render() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = 'green';
    snake.forEach(segment => {
      context.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize);
    });

    context.fillStyle = 'red';
    context.fillRect(apple.x * blockSize, apple.y * blockSize, blockSize, blockSize);
  }

  // Handle keydown events to change direction
  document.addEventListener('keydown', event => {
    switch (event.key) {
      case 'ArrowUp':
        if (direction !== 'down') direction = 'up';
        break;
      case 'ArrowDown':
        if (direction !== 'up') direction = 'down';
        break;
      case 'ArrowLeft':
        if (direction !== 'right') direction = 'left';
        break;
      case 'ArrowRight':
        if (direction !== 'left') direction = 'right';
        break;
    }
  });

  // Check for boundary and self collisions
  function checkCollision(head) {
    // Check boundary collision
    if (head.x < 0 || head.x >= canvasWidth / blockSize ||
        head.y < 0 || head.y >= canvasHeight / blockSize) {
      return true;
    }
    // Check self collision
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  }

  // Place apple at a random position not occupied by the snake
  function placeApple() {
    let applePlaced = false;
    while (!applePlaced) {
      apple.x = Math.floor(Math.random() * (canvasWidth / blockSize));
      apple.y = Math.floor(Math.random() * (canvasHeight / blockSize));
      applePlaced = !snake.some(segment => segment.x === apple.x && segment.y === apple.y);
    }
  }

  // Game loop
  function gameLoop() {
    // Move the snake
    const head = { ...snake[0] };
    switch (direction) {
      case 'right':
        head.x += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
    }

    // Check for collisions
    if (checkCollision(head)) {
      clearInterval(gameInterval);
      clearInterval(timerInterval); // Stop the timer
      alert('Game Over');
      saveHighScore(score, timer);
      displayHighScores();
      return;
    }

    // Add new head to snake
    snake.unshift(head);

    // Check if the snake has eaten the apple
    if (head.x === apple.x && head.y === apple.y) {
      score += 1; // Increment the score
      scoreElement.textContent = score; // Update score display
      placeApple(); // Place a new apple
    } else {
      // Remove the last segment of the snake
      snake.pop();
    }

    // Render the updated snake and apple
    render();
  }

  // Timer function
  function updateTimer() {
    timer += 1;
    timerElement.textContent = timer;
  }

  // Start the game loop and timer
  gameInterval = setInterval(gameLoop, 100);
  timerInterval = setInterval(updateTimer, 1000);

  // Fetch and display high scores
  function displayHighScores() {
    // Remove existing high score board if present
    const existingHighScoreBoard = document.getElementById('highScoreBoard');
    if (existingHighScoreBoard) {
      existingHighScoreBoard.remove();
    }

    fetch('/api/highScores')
      .then(response => response.json())
      .then(highScores => {
        const highScoreBoard = document.createElement('div');
        highScoreBoard.id = 'highScoreBoard';
        highScoreBoard.className = 'text-center mt-3';
        highScoreBoard.innerHTML = '<h2>High Scores</h2>';
        highScores.forEach((score, index) => {
          const scoreElement = document.createElement('p');
          scoreElement.textContent = `${index + 1}. ${score.name}: ${score.score}`;
          highScoreBoard.appendChild(scoreElement);
        });
        document.body.appendChild(highScoreBoard);
      })
      .catch(error => console.error('Error fetching high scores:', error));
  }

  // Save high score
  function saveHighScore(score, time) {
    const name = prompt('Enter your name:');
    if (name) {
      fetch('/api/highScores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, score, time })
      })
      .then(response => response.json())
      .then(highScores => {
        console.log('High scores updated:', highScores);
      })
      .catch(error => console.error('Error saving high score:', error));
    }
  }
});