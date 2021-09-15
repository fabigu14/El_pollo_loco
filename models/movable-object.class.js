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

    /**
     * This function applies gravity to the object it is called on
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accaloration;
            }
        }, 1000 / 25);
    }

    /**
     * This function checks if an object is above the ground
     * 
     * @returns {boolean} 
     */
    isAboveGround() {
        if (this.isDead()) {
            return true;
        } else if (this instanceof Endboss) {
            return false;
        } else if (this instanceof ThrowableObject) {
            return this.y < 350;
        } else {
            return this.y < 180;
        }
    }

    /**
     * This function checks if two objects are colliding
     * 
     * @param {Object} mo - movable object this is compared with 
     * @returns {boolean} - is colliding or not
     */
    isColliding(mo) {
        return !(
            ((this.y + this.offsetY) + (this.height - this.offsetHeight) < (mo.y + mo.offsetY)) ||
            ((this.y + this.offsetY) > (mo.y + mo.offsetY) + (mo.height - mo.offsetHeight)) ||
            ((this.x + this.offsetX) + (this.width - this.offsetWidth) < (mo.x + mo.offsetX)) ||
            ((this.x + this.offsetX) > (mo.x + mo.offsetX) + (mo.width - mo.offsetWidth))
        );
    }

    /**
     * This function inflicts damage on an object
     * 
     * @param {number} damage - amount of damage
     */
    hit(damage) {

        this.playHitSound();
        this.energy -= damage;

        if (this.energy >= 0) {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function sets an audio if the enboss or character was hit
     */
    playHitSound() {
        if (this instanceof Endboss) {
            this.playAudio(this.endboss_hurt);
        } else if (this instanceof Character) {
            this.playAudio(this.character_hurt);
        }
    }

    /**
     * This function checks if an object is dead
     * 
     * @returns {boolean} - dead or not
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * This function checks if the last hit is the last before an object is dying
     * 
     * @returns {boolean} - lasthit or not
     */
    isLastHit() {
        let timePassed;
        timePassed = new Date().getTime() - this.lastHit;

        timePassed = timePassed / 1000;
        return this.energy <= 0 && timePassed < 0.3;
    }

    /**
     * This function checks if an object is hurt
     * 
     * @returns {boolean} - last hit happend less than a second ago
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;

        return timePassed < 1;
    }

    /**
     * This function moves an object to the right
     */
    moveRight() {
        if (this.gameHasStarted) {
            this.x += this.movingSpeed;
        }
    }

    /**
     * This function moves an object to the left
     */
    moveLeft() {
        if (this.gameHasStarted) {
            this.x -= this.movingSpeed;
        }
    }

    /**
     * This function gets current path from Cache and assigns it to current img-object
     * 
     * @param {Array.<String>} images - Array of img-paths to a movement type
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * This function lets the character jump
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * This function declares the movement after an objects death
     * 
     * @param {number} speedY - vertical speed
     * @param {number} accaloration - accaloration of gravity
     */
    death(speedY, accaloration) {
        this.speedY = speedY;
        this.accaloration = accaloration;
    }
}