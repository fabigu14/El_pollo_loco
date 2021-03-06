class Character extends MovableObject {
    height = 250;
    width = 130;
    y = 180;
    movingSpeed = 10;
    offsetX = 10;
    offsetY = 90;
    offsetWidth = 20;
    offsetHeight = 100;
    deathSpeedY = 15;
    deathAccaloration = 1;
    IMAGES_WALKING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-31.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-32.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-39.png'
    ];

    IMAGES_DYING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png'
    ];

    running_audio = new Audio('audio/running_2.mp3');
    jumping_audio = new Audio('audio/jump.mp3');

    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    /**
     * This function invokes two functions, which are needed to animate the character
     */
    animate() {

        this.animateMovement();
        this.animateImages();
    }

    /**
     * This function checks which movement the character is performing
     */
    animateMovement() {
        setInterval(() => {
            this.running_audio.pause();
            if (this.world.keyboard.RIGHT && this.x < (this.world.level.level_end_x + 150)) {
                this.characterMoveRight();
            }
            if (this.world.keyboard.LEFT && this.x > -618) {
                this.characterMoveLeft();
            }
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.chracterJump();
            }
            if (this.isLastHit()) {
                this.death(this.deathSpeedY, this.deathAccaloration);
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * This function invokes the moveRight() function of the Movable-Object class &
     * plays an running sound
     */
    characterMoveRight() {
        this.moveRight();
        this.oppositeDirection = false;
        this.playAudio(this.running_audio);
    }

    /**
     * This function invokes the moveLeft() function of the Movable-Object class &
     * plays an running sound
     */
    characterMoveLeft() {
        this.moveLeft();
        this.oppositeDirection = true;
        this.playAudio(this.running_audio);
    }

    /**
     * This function invokes the jump() function of the Movable-Object class &
     * plays an jumping sound
     */
    chracterJump() {
        this.jump();
        this.playAudio(this.jumping_audio);
    }

    /**
     * This function checks current state of the character &
     * sets the Images for this state
     */
    animateImages() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DYING);
            }
            if (this.isLastHit()) {
                this.playAnimation(this.IMAGES_DYING);
            } else if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround() && !this.isDead()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 100);
    }
}