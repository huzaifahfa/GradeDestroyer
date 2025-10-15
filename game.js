let phase = 'hunting'; // hunting, snake-game, submitted
let buttonPos = { x: 50, y: 50 };
let clicks = 0;
let timeLeft = 120;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameOver = false;
let successfulEats = 0;
let foodTimer = null;

const GRID_SIZE = 18;
const CELL_SIZE = 18;
const GAME_SPEED = 150;

// DOM elements
const timerElement = document.getElementById('timer');
const gameArea = document.getElementById('gameArea');

// Timer
setInterval(() => {
  if (phase !== 'submitted' && timeLeft > 0) {
    timeLeft--;
    updateTimer();
  } else if (timeLeft === 0 && phase !== 'submitted') {
    // Time's up! Trigger 67 spam and refresh
    window.parent.postMessage({ type: 'TIME_UP_SPAM_67' }, '*');
  }
}, 1000);

function updateTimer() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  timerElement.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  
  if (timeLeft < 30) {
    timerElement.classList.add('critical');
  }
}

function getRandomPosition() {
  return {
    x: Math.random() * 70 + 10,
    y: Math.random() * 60 + 15
  };
}

// Phase 1: Button Hunt
function renderButtonHunt() {
  gameArea.innerHTML = `
    <div class="phase-info">
      <h2 class="phase-title">⚠️ Phase 1: Button Hunt</h2>
      <p class="phase-description">
        Click the submit button ${5 - clicks} more time${5 - clicks !== 1 ? 's' : ''} to proceed...
        <br><small>(It will jump after each click. Good luck!)</small>
      </p>
    </div>
    <div class="hunt-area" id="huntArea">
      <button class="submit-button" id="submitBtn">Submit Assignment</button>
    </div>
  `;
  
  const btn = document.getElementById('submitBtn');
  const huntArea = document.getElementById('huntArea');
  
  btn.style.left = `${buttonPos.x}%`;
  btn.style.top = `${buttonPos.y}%`;
  
  btn.onclick = () => {
    clicks++;
    if (clicks >= 5) {
      phase = 'snake-game';
      renderSnakeGame();
      startSnakeGame();
    } else {
      buttonPos = getRandomPosition();
      btn.style.left = `${buttonPos.x}%`;
      btn.style.top = `${buttonPos.y}%`;
    }
  };
}

// Phase 2: Snake Game
function renderSnakeGame() {
  gameArea.innerHTML = `
    <div class="phase-info">
      <h2 class="phase-title">⚠️ Phase 2: Snake Challenge</h2>
      <p class="phase-description">
        Eat the submit button ${7 - successfulEats} more time${7 - successfulEats !== 1 ? 's' : ''} without dying!
        <br><small>Use arrow keys to move. Don't hit walls or yourself!</small>
      </p>
    </div>
    <div class="snake-container">
      <div class="snake-stats">
        <div>Score: <span class="stat-value" id="score">0</span></div>
        <div>Successful Eats: <span class="stat-value" id="eats">0/7</span></div>
      </div>
      <div class="snake-grid" id="snakeGrid" style="width: ${GRID_SIZE * CELL_SIZE}px; height: ${GRID_SIZE * CELL_SIZE}px;">
        <!-- Snake and food will be rendered here -->
      </div>
    </div>
  `;
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE)
  };
  
  // Clear old timer if it exists
  if (foodTimer) {
    clearTimeout(foodTimer);
  }
  
  // Set new timer - move food after 2 seconds
  foodTimer = setTimeout(() => {
    if (phase === 'snake-game' && !gameOver) {
      generateFood();
      renderSnake();
    }
  }, 2000);
}

function checkCollision(head) {
  // Wall collision
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }
  // Self collision
  for (let segment of snake) {
    if (head.x === segment.x && head.y === segment.y) {
      return true;
    }
  }
  return false;
}

function moveSnake() {
  if (gameOver || phase !== 'snake-game') return;
  
  direction = { ...nextDirection };
  
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };
  
  if (checkCollision(newHead)) {
        gameOver = true;
        successfulEats = 0;
        score = 0;
        document.getElementById('score').textContent = '0';
        document.getElementById('eats').textContent = '0/7';
        
        // Clear food timer
        if (foodTimer) {
            clearTimeout(foodTimer);
        }
        
        showGameOver();
        setTimeout(() => {
            snake = [{ x: 10, y: 10 }];
            direction = { x: 1, y: 0 };
            nextDirection = { x: 1, y: 0 };
            gameOver = false;
            generateFood();
            renderSnake();
        }, 1500);
        return;
    }
  
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    successfulEats++;
    document.getElementById('score').textContent = score;
    document.getElementById('eats').textContent = `${successfulEats}/7`;
    
    if (successfulEats === 6) {
        show67InsideGame();
    } 

    if (successfulEats >= 7) {
      phase = 'submitted';
      renderSuccess();
      window.parent.postMessage({ type: 'GRADE_DESTROYER_COMPLETE' }, '*');
      return;
    }
    
    generateFood();
    snake.unshift(newHead);
  } else {
    snake.unshift(newHead);
    snake.pop();
  }
  
  renderSnake();
}

function renderSnake() {
  const grid = document.getElementById('snakeGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  // Render snake
  snake.forEach((segment, i) => {
    const cell = document.createElement('div');
    cell.className = `snake-cell ${i === 0 ? 'snake-head' : 'snake-body'}`;
    cell.style.left = `${segment.x * CELL_SIZE}px`;
    cell.style.top = `${segment.y * CELL_SIZE}px`;
    cell.style.width = `${CELL_SIZE - 2}px`;
    cell.style.height = `${CELL_SIZE - 2}px`;
    grid.appendChild(cell);
  });
  
  // Render food
  const foodCell = document.createElement('div');
  foodCell.className = 'snake-cell food';
  foodCell.textContent = 'S';
  foodCell.style.left = `${food.x * CELL_SIZE}px`;
  foodCell.style.top = `${food.y * CELL_SIZE}px`;
  foodCell.style.width = `${CELL_SIZE - 2}px`;
  foodCell.style.height = `${CELL_SIZE - 2}px`;
  grid.appendChild(foodCell);
}

function show67InsideGame() {
  const container = document.querySelector('.container');
  const count = 40;
  const elements = [];
  
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.textContent = '67';
    span.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      font-size: ${Math.random() * 80 + 40}px;
      font-weight: bold;
      color: #ef4444;
      z-index: 999999;
      pointer-events: none;
      animation: fadeInOut67 2s ease-in-out;
      opacity: 0;
      text-shadow: 0 0 20px rgba(239, 68, 68, 0.8);
    `;
    document.body.appendChild(span);
    elements.push(span);
  }
  
  // Add animation style if not already added
  if (!document.getElementById('fade-67-style')) {
    const style = document.createElement('style');
    style.id = 'fade-67-style';
    style.textContent = `
      @keyframes fadeInOut67 {
        0% { opacity: 0; transform: scale(0.3) rotate(0deg); }
        50% { opacity: 1; transform: scale(1.3) rotate(180deg); }
        100% { opacity: 0; transform: scale(0.5) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Remove after animation
  setTimeout(() => {
    elements.forEach(el => el.remove());
  }, 2100);
}

function showGameOver() {
  const grid = document.getElementById('snakeGrid');
  const overlay = document.createElement('div');
  overlay.className = 'game-over-overlay';
  
  // Array of mocking memes
  const memes = [
    'https://i.imgflip.com/2/30b1gx.jpg', // Laughing Tom Cruise
    'https://i.imgflip.com/2/1otk96.jpg', // Laughing Leo DiCaprio
    'https://i.imgflip.com/2/4t0m5.jpg',  // Laughing Wolves
    'https://i.imgflip.com/2/8p0a.jpg',   // Laughing Spidermen
    'https://i.imgflip.com/2/5c7lwq.jpg', // Monkey looking away
    'https://i.kym-cdn.com/photos/images/original/001/473/877/421.gif', // Risitas laughing
  ];
  
  const randomMeme = memes[Math.floor(Math.random() * memes.length)];
  
  overlay.innerHTML = `
    <img src="${randomMeme}" style="max-width: 200px; max-height: 200px; border-radius: 10px; margin-bottom: 1rem;" onerror="this.style.display='none'">
    <div class="game-over-text">GAME OVER!</div>
    <p style="color: #d1d5db;">Progress reset. Try again... 😂</p>
  `;
  grid.appendChild(overlay);
}
let gameInterval;

function startSnakeGame() {
  gameInterval = setInterval(moveSnake, GAME_SPEED);
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (phase !== 'snake-game' || gameOver) return;
  
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 0) nextDirection = { x: 0, y: -1 };
      e.preventDefault();
      break;
    case 'ArrowDown':
      if (direction.y === 0) nextDirection = { x: 0, y: 1 };
      e.preventDefault();
      break;
    case 'ArrowLeft':
      if (direction.x === 0) nextDirection = { x: -1, y: 0 };
      e.preventDefault();
      break;
    case 'ArrowRight':
      if (direction.x === 0) nextDirection = { x: 1, y: 0 };
      e.preventDefault();
      break;
  }
});

// Success screen
function renderSuccess() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  
  gameArea.innerHTML = `
    <div class="success-screen">
      <div class="success-emoji">🎉</div>
      <h2 class="success-title">Challenge Complete!</h2>
      <p class="success-text">You may now submit your assignment.</p>
      <p style="color: #9ca3af;">Time remaining: <strong>${mins}:${secs.toString().padStart(2, '0')}</strong></p>
    </div>
  `;
}

// Initialize
renderButtonHunt();