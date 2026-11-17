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
        this.lastGroundY = y;
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
                this.lastGroundY = this.y;
            }
        }
        
        // Проверка приземления на зеленую землю
        if (this.y + this.height >= canvasHeight - 40) {
            this.y = canvasHeight - 40 - this.height;
            this.velY = 0;
            this.grounded = true;
            this.lastGroundY = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#ff4757';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Смещение глаз в сторону движения
        const eyeOffsetX = this.facing === 'right' ? 6 : -6;
         
        // Белки глаз
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.x + 8 + eyeOffsetX, this.y + 10, 8, 8);
        ctx.fillRect(this.x + 24 + eyeOffsetX, this.y + 10, 8, 8);

        // Зрачки
        ctx.fillStyle = "#2f3542";
        const pupilShift = this.facing === 'right' ? 4 : 0;
        ctx.fillRect(this.x + 8 + eyeOffsetX, this.y + 12, 4, 4);
        ctx.fillRect(this.x + 24 + eyeOffsetX, this.y + 12, 4, 4);
    }
} 
