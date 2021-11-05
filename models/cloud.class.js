class Cloud extends MovableObject {
    y = 50;
    height = 200;
    width = 500;
    movingSpeed = 0.2;

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');

        this.x = Math.random() * 500;


        this.animate();
    }

    /**
     * This function invokes the moveLeft() function of the Movable-Object class &
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
}