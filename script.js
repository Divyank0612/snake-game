const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restartButton");

const gridSize = 20; // Size of each grid square
const tileCount = canvas.width / gridSize; // Number of tiles in each row/column

let snake = [{ x: 10, y: 10 }]; // Initial snake position
let food = { x: 5, y: 5 }; // Initial food position
let direction = { x: 0, y: 0 }; // Initial direction (not moving)
let score = 0;
let gameOver = false;

// Draw the game
function draw() {
  if (gameOver) return;

  // Clear the canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "lime";
  snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Move the snake
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Debugging: Log the snake's head position
  console.log("Snake Head:", head);

  // Check for collisions
// Check for collisions
    if (
    head.x < 0 || head.x >= tileCount || // Check if head is outside the canvas
    head.y < 0 || head.y >= tileCount || // Check if head is outside the canvas
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y) // Check if head collides with the body (excluding the head itself)
    ) {
    gameOver = true;
    alert(`Game Over! Your score is ${score}.`);
    return;
  }

  // Add new head to the snake
  snake.unshift(head);

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreElement.textContent = score;
    placeFood();
  } else {
    // Remove the tail (snake doesn't grow)
    snake.pop();
  }

  // Continue the game loop
  setTimeout(draw, 100);
}

// Place food at a random position
function placeFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);

  // Ensure the food doesn't spawn on the snake
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

// Start or restart the game
function startGame() {
  snake = [{ x: 10, y: 10 }]; // Reset snake to initial position
  direction = { x: 0, y: 0 }; // Reset direction
  score = 0; // Reset score
  scoreElement.textContent = score; // Update score display
  gameOver = false; // Reset game over state
  placeFood(); // Place new food
  draw(); // Start the game loop
}

// Handle keyboard input
document.addEventListener("keydown", e => {
  if (gameOver) return;

  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 }; // Prevent reversing direction
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 }; // Prevent reversing direction
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 }; // Prevent reversing direction
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 }; // Prevent reversing direction
      break;
  }
});

// Restart the game when the button is clicked
restartButton.addEventListener("click", startGame);

// Start the game initially
startGame();