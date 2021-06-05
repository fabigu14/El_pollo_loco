class MovableObject {
    x = 120;
    y = 200;
    img;
    height = 90;
    width = 90;
    imageCache = {};
    currentImage = 0;
    movingSpeed;
    oppositeDirection = false;

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
        console.log('moving right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.movingSpeed;
            
        }, 1000 / 60)
    }
}