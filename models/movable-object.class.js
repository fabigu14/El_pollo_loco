class MovableObject extends DrawableObject {

    movingSpeed;
    oppositeDirection = false;
    speedY = 0;
    accaloration = 2.5;
    energy = 100;
    lastHit = 0;
    // lastHitEndboss = 0;

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
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    hit(damage) {
        this.energy -= damage;

        if (this.energy >= 0) {
            this.lastHit = new Date().getTime();
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
        this.x += this.movingSpeed;

    }

    moveLeft() {
        this.x -= this.movingSpeed;
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