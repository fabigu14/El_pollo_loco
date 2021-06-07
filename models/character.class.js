class Character extends MovableObject {
    height = 250;
    width = 130;
    y = 180;
    movingSpeed = 10;
    IMAGES_WALKING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
    ];
    world;
    running_audio = new Audio('audio/running_2.mp3');

    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png')
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.running_audio.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x ) {
                this.x += this.movingSpeed;
                this.oppositeDirection = false;
                this.running_audio.play();
            }

            if (this.world.keyboard.LEFT && this.x > -618) {
                this.x -= this.movingSpeed;
                this.oppositeDirection = true;
                this.running_audio.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 100);

    }


    jump() {

    }
}