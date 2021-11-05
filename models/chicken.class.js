class Chicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ];
    y = 355;

    constructor(gameHasStarted) {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png')
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 2500;
        this.movingSpeed = Math.random() * 1 + 0.2;
        this.gameHasStarted = gameHasStarted;
        this.animate()
    }

    /**
     * This function invokes the moveLeft() function of the Movable-Object class &
     * sets images for the walking animation of the chickens
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }
}