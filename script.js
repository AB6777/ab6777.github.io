const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("sc");
const overlay = document.getElementById("game-overlay");

const box = 20;
let snake, food, score, direction, game;

function initGame() {
    canvas.width = 400;
    canvas.height = 400;
    snake = [{ x: 9 * box, y: 10 * box }];
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    score = 0;
    direction = "RIGHT";
    scoreElement.innerHTML = score;
}

function openGame() {
    overlay.style.display = "flex";
    initGame();
    if(game) clearInterval(game);
    game = setInterval(draw, 100);
}

function closeGame() {
    overlay.style.display = "none";
    clearInterval(game);
}

function move(dir) {
    if (dir == 'up' && direction != "DOWN") direction = "UP";
    else if (dir == 'down' && direction != "UP") direction = "DOWN";
    else if (dir == 'left' && direction != "RIGHT") direction = "LEFT";
    else if (dir == 'right' && direction != "LEFT") direction = "RIGHT";
}

document.addEventListener("keydown", (e) => {
    if (e.keyCode == 37 && direction != "RIGHT") direction = "LEFT";
    else if (e.keyCode == 38 && direction != "DOWN") direction = "UP";
    else if (e.keyCode == 39 && direction != "LEFT") direction = "RIGHT";
    else if (e.keyCode == 40 && direction != "UP") direction = "DOWN";
});

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#ff0000" : "#39ff14";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "cyan";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("O'YIN TUGADI! OCHKO: " + score);
        closeGame();
        return;
    }

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        scoreElement.innerHTML = score;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}
