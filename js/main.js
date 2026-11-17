import { Player } from './player.js';
import { Level } from './level.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreBoard = document.getElementById('scoreBoard');

const player = new Player(100, 200);
const level = new Level();
let keys = {};
let score = 0;

window.addEventListener('keydown', (e) => {
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
    }
    keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

window.addEventListener('blur', () => {
    keys = {};
});

function checkCoins() {
    for (const coin of level.coins) {
        if (!coin.collected) {
        // Проверка пересечения квадрата игрока и квадрата вокруг монетки
        const hitX = player.x < coin.x + coin.radius && player.x + player.width > coin.x - coin.radius;
        const hitY = player.y < coin.y + coin.radius && player.y + player.height > coin.y - coin.radius;
          if (hitX && hitY) {
              coin.collected = true;
              score += 1;
              scoreBoard.textContent = `Монеты: ${score} / ${level.coins.length}`;
          }
        }
    }
}
function gameloop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Отрисовка земли
    ctx.fillStyle = '#2ed573';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

    level.draw(ctx);
    player.update(keys, canvas.width, canvas.height, level.platforms);
    checkCoins();
    player.draw(ctx);

    requestAnimationFrame(gameloop);
}

gameloop();
