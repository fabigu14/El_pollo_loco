class MovableObject {
    x = 0;
    y = 200;
    img;
    height = 70;
    width = 70;
    imageCache = {};
    currentImage = 0;
    movingSpeed;
    oppositeDirection = false;
    speedY = 0;
    accaloration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accaloration;
            }

        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 180;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        this.x += this.movingSpeed;
        
    }

    moveLeft() {
        this.x -= this.movingSpeed;
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;;
    }
    jump() {
        this.speedY = 30;
    }
}