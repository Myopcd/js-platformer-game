import { Player } from './player.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = new Player(100, 200);
let keys = {};

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

function gameloop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Отрисовка земли
    ctx.fillStyle = '#2ed573';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

    player.update(keys, canvas.width, canvas.height);
    player.draw(ctx);

    requestAnimationFrame(gameloop);
}

gameloop();
