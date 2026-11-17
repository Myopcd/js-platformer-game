export class Level {
    constructor() {
        this.platforms = [
            { x: 200, y: 330, width: 140, height: 20},
            { x: 420, y: 260, width: 140, height: 20},
            { x: 180, y: 170, width: 140, height: 20},
            { x: 450, y: 90, width: 150, height: 20},
            { x: 220, y: 10, width: 140, height: 20},
            { x: 460, y: -70, width: 140, height: 20},
            { x: 190, y: -150, width: 140, height: 20},
            { x: 430, y: -230, width: 140, height: 20},
            { x: 210, y: -310, width: 140, height: 20},
            { x: 380, y: -390, width: 160, height: 20}
        ];

        this.coins = this.platforms.map((platform) => ({
            x: platform.x + platform.width / 2,
            y: platform.y - 30,
            radius: 12,
            collected: false
        }));
    }

    draw(ctx) {
        // Отрисовка платформ
        ctx.fillStyle = '#ffa502';
        ctx.strokeStyle = '#eccc58';
        ctx.lineWidth = 2;


        for (const platform of this.platforms) {
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height );
            ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
        }
        
        // Отрисовка несобранных монеток
        for (const coin of this.coins) {
            if (!coin.collected) {
                ctx.beginPath();
                ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#ffd32a';
                ctx.fill();
                ctx.strokeStyle = "#ffa801";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();

            }
        }
    }
}











