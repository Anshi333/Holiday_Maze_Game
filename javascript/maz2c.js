const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

const rows = 15;
const cols = 15;

const tileSize = canvas.width / cols;

const candyCaneImg = new Image();
candyCaneImg.src = '../images/cc.png';

const houseImg = new Image();
houseImg.src = '../images/mazeh.png';

// Directions for moving (up, down, left, right)
const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1],  // right
];

// Initialize maze with walls (1)
const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

// Function to check if the move is valid
function isValidMove(x, y) {
    return x >= 0 && x < rows && y >= 0 && y < cols && maze[x][y] === 1;
}

// Maze generation function
function carveMaze(x, y) {
    maze[x][y] = 0; // Mark the current cell as part of the path (0)

    // Shuffle directions to randomize the carving process
    const shuffledDirections = directions.sort(() => Math.random() - 0.5);

    // Try each direction
    for (const [dx, dy] of shuffledDirections) {
        const nx = x + dx * 2; // Skip one cell to ensure path width
        const ny = y + dy * 2;

        if (isValidMove(nx, ny)) {
            maze[x + dx][y + dy] = 0; // Carve the wall between current and next cell
            carveMaze(nx, ny); // Recursively carve further
        }
    }
}

// Start carving from the top-left corner
carveMaze(0, 0);

// Ensure the bottom-right corner is the exit (0)
maze[rows - 1][cols - 1] = 2; // Set exit at bottom-right

let player = { x: 0, y: 0 };

// Function to draw the maze on the canvas
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tile = maze[row][col];

            if (tile === 1) {
                ctx.fillStyle = '#331F1B'; // Wall color
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            } else if (tile === 2) {
                ctx.drawImage(houseImg, col * tileSize, row * tileSize, tileSize, tileSize); // Exit (house)
            }
        }
    }

    ctx.drawImage(candyCaneImg, player.x * tileSize, player.y * tileSize, tileSize, tileSize); // Player
}

// Function to check if player has won
function checkWin() {
    if (maze[player.y][player.x] === 2) {
        window.location.href = '../cong2.html'; // Redirect to a new page on win
    }
}

// Function to move player
function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && maze[newY][newX] !== 1) {
        player.x = newX;
        player.y = newY;
        drawMaze();
        checkWin();
    }
}

// Event listener for keydown to move the player
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

// Initialize and draw the maze when the window is loaded
window.onload = function () {
    drawMaze();
};
