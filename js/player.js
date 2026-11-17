export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.speed = 5;
        this.velY = 0;
        this.gravity = 0.6;
        this.jumpForce = -12;
        this.grounded = false;
    }

    update(keys, canvasWidth, canvasHeight, platforms) {
        if (keys['ArrowLeft'] || keys['KeyA']) this.x -= this.speed;
        if (keys['ArrowRight'] || keys['KeyD']) this.x += this.speed;


        // Не даём уехать за границы экрана!
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvasWidth) {
           this.x = canvasWidth - this.width;
        }
    
        if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && this.grounded) {
            this.velY = this.jumpForce;
            this.grounded = false;
        }

        // Запоминаем прошлую позицию по Y до падения
        const prevY = this.y;

        this.velY += this.gravity;
        this.y += this.velY;
        this.grounded = false;

        // Проверка приземления на платформы (только при падении сверху)
        for (const platform of platforms) {
            if (
                this.velY >= 0 &&
                this.x + this.width > platform.x &&
                this.x < platform.x + platform.width &&
                prevY + this.height <= platform.y &&
                this.y + this.height >= platform.y
            ) {
                this.y = platform.y - this.height;
                this.velY = 0;
                this.grounded = true;
            }
        }
        
        // Проверка приземления на зеленую землю
        if (this.y + this.height >= canvasHeight - 40) {
            this.y = canvasHeight - 40 - this.height;
            this.velY = 0;
            this.grounded = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#ff4757';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
