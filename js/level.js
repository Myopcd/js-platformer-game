export class Level {
    constructor() {
        this.platforms = [
            { x: 200, y: 330, width: 140, height: 20},
            { x: 420, y: 260, width: 140, height: 20},
            { x: 180, y: 180, width: 140, height: 20},
            { x: 480, y: 120, width: 160, height: 20}
        ];

        this.coins = [
            { x:270, y: 295, radius: 12, collected: false },
            { x:490, y: 225, radius: 12, collected: false },
            { x:250, y: 145, radius: 12, collected: false },
            { x:560, y: 85, radius: 12, collected: false }
        ]
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











