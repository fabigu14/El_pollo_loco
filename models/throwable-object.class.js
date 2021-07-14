class ThrowableObject extends MovableObject {

    IMAGES_THROW = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'
    ];

    speedX = 15;

    constructor(x, y) {
        super().loadImage('img/6.botella/1.Marcador.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_THROW);
        this.throwObject()
    }

    throwObject() {
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
    }
}