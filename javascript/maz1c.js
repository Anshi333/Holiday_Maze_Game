const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

const rows = 10;  
const cols = 10; 

const tileSize = canvas.width / cols;

const candyCaneImg = new Image();
candyCaneImg.src = 'https://Anshi333.github.io/Holiday_Maze_Game/images/cc.png';

const houseImg = new Image();
houseImg.src = 'https://Anshi333.github.io/Holiday_Maze_Game/images/mazeh.png';

const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1],  // right
];

const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

function isValidMove(x, y) {
    return x >= 0 && x < rows && y >= 0 && y < cols && maze[x][y] === 1;
}

function carveMaze(x, y) {
    maze[x][y] = 0;
    
    const shuffledDirections = directions.sort(() => Math.random() - 0.5);

    for (const [dx, dy] of shuffledDirections) {
        const nx = x + dx * 2; 
        const ny = y + dy * 2;

        if (isValidMove(nx, ny)) {
            maze[x + dx][y + dy] = 0; 
            carveMaze(nx, ny); 
        }
    }
}

carveMaze(0, 0);

maze[rows - 1][cols - 1] = 2; 

maze[rows - 1][cols - 2] = 0; 

maze[rows - 1][cols - 1] = 2; 

maze[0][0] = 0;
maze[rows - 1][cols - 1] = 2;

let player = { x: 0, y: 0 };

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tile = maze[row][col];

            if (tile === 1) {
                ctx.fillStyle = '#331F1B'; 
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            } else if (tile === 2) {
                ctx.drawImage(houseImg, col * tileSize, row * tileSize, tileSize, tileSize); 
            }
        }
    }

    ctx.drawImage(candyCaneImg, player.x * tileSize, player.y * tileSize, tileSize, tileSize); 
}

function checkWin() {
    if (maze[player.y][player.x] === 2) {
        window.location.href = 'https://Anshi333.github.io/Holiday_Maze_Game/cong1.html';
    }
}

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

window.onload = function () {
    drawMaze();
};
