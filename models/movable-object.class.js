class MovableObject extends DrawableObject {

    movingSpeed;
    oppositeDirection = false;
    speedY = 0;
    accaloration = 2.5;
    energy = 100;
    lastHit = 0;
    gameHasStarted = false;
    endboss_hurt = new Audio('audio/chicken.mp3');
    character_hurt = new Audio('audio/character_hurt.mp3');


    applyGravity() {
        setInterval(() => {

            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accaloration;
            }

        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject || this.isDead()) {
            return true;
        } else if (this instanceof Endboss) {
            return false;
        } else {
            return this.y < 180;
        }
    }

    isColliding(mo) {
        if (this instanceof Character && mo instanceof CollectableObject) {

            return !(
                ((this.y + 90) + (this.height - 100) < (mo.y + 15)) ||
                ((this.y + 90) > (mo.y + 15) + (mo.height - 30)) ||
                ((this.x + 10) + (this.width - 20) < (mo.x + 15)) ||
                ((this.x + 10) > (mo.x + 15) + (mo.width - 30))
            );

        } else {
            return this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x + mo.width &&
                this.y < mo.y + mo.height;
        }
    }

    hit(damage) {

        this.playHitSound();
        this.energy -= damage;

        if (this.energy >= 0) {
            this.lastHit = new Date().getTime();
        }
    }

    playHitSound() {
        if (this instanceof Endboss) {
            this.playAudio(this.endboss_hurt);
        } else if (this instanceof Character) {
            this.playAudio(this.character_hurt);
        }
    }

    isDead() {
        return this.energy <= 0;
    }

    isLastHit() {
        let timePassed;
        timePassed = new Date().getTime() - this.lastHit;


        timePassed = timePassed / 1000;
        return this.energy <= 0 && timePassed < 0.3;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;

        return timePassed < 1;
    }

    moveRight() {
        if (this.gameHasStarted) {
            this.x += this.movingSpeed;
        }
    }

    moveLeft() {
        if (this.gameHasStarted) {
            this.x -= this.movingSpeed;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;;
    }

    jump() {
        this.speedY = 30;
    }

    death(speedY, accaloration) {
        this.speedY = speedY;
        this.accaloration = accaloration;
    }
}