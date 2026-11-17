export class Level {
    constructor() {
        this.platforms = [
            { x: 200, y: 330, width: 140, height: 20},
            { x: 420, y: 260, width: 140, height: 20},
            { x: 180, y: 180, width: 140, height: 20},
            { x: 480, y: 120, width: 160, height: 20},
        ];
    }

    draw(ctx) {
        ctx.fillStyle = '#ffa502';
        for (const platform of this.platforms) {
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height );
        }
        
    }
}











