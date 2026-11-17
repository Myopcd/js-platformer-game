import { Player } from './player.js';
import { Level } from './level.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreBoard = document.getElementById('scoreBoard');
const winScreen = document.getElementById('winScreen');
const restartBtn = document.getElementById('restartBtn');
const finalTimeText = document.getElementById('finalTimeText');
const recordsList = document.getElementById('recordsList');

let player = new Player(100, 200);
let level = new Level();
let keys = {};
let score = 0;
let isGameWon = false;
let cameraY = 0;

let startTime = null;
let elapsedTime = 0;

window.addEventListener('keydown', (e) => {
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
    }
    if (!startTime && !isGameWon) {
        startTime = performance.now();
    }
    keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

window.addEventListener('blur', () => {
    keys = {};
});

function saveAndRenderRecords(newTime) {
    const saved = JSON.parse(localStorage.getItem('platformer_records')) || [];
    saved.push(Number(newTime.toFixed(2)));
    saved.sort((a, b) => a - b);
    const top3 = saved.slice(0, 3);
    localStorage.setItem('platformer_records', JSON.stringify(top3));

    recordsList.innerHTML = top3
       .map((time) => `<li>${time.toFixed(2)} сек.</li>`)
       .join('');
}

function restartGame() {
    player = new Player (100, 200);
    level = new Level ();
    score = 0;
    isGameWon = false;
    keys = {};
    startTime = null;
    elapsedTime = 0;

    scoreBoard.textContent = `Монеты: 0 / ${level.coins.length}`;
    timerBoard.textContent = `Время: 0.0с`;
    winScreen.classList.add('hidden');
}

restartBtn.addEventListener('click', restartGame);

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

              if (score === level.coins.length) {
                isGameWon = true;
                finalTimeText.textContent = `Ваше время: ${elapsedTime.toFixed(2)} сек.`;
                saveAndRenderRecords(elapsedTime);
                winScreen.classList.remove('hidden');
              }
          }
        }
    }
}

function gameloop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isGameWon) {
      if (startTime) {
        elapsedTime = (performance.now() - startTime) / 1000;
        timerBoard.textContent = `Время: ${elapsedTime.toFixed(1)} с`;
      }

        player.update(keys, canvas.width, canvas.height, level.platforms);
        checkCoins();

        // Плавное слежение камеры за игроком, когда он поднимается выше середины экрана
        const anchorY = player.y > player.lastGroundY + 150 ? player.y : player.lastGroundY;
        const targetCameraY= Math.max(0, 230 - player.y);
        cameraY += (targetCameraY - cameraY) * 0.08;
    }

    //Сдвигаем камеру перед отрисовкой игрового мира
    ctx.save();
    ctx.translate(0, cameraY);

    //Отрисовка земли
    ctx.fillStyle = '#2ed573';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

    level.draw(ctx);
    player.draw(ctx);

    //Возвращаем координаты холста в исходное положение
    ctx.restore();

    requestAnimationFrame(gameloop);
}

gameloop();
