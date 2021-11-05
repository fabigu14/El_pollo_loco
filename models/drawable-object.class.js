class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 200;
    height = 70;
    width = 70;
    offsetX = 0;
    offsetY = 0;
    offsetWidth = 0;
    offsetHeight = 0;

    /**
     * This function creates a new Image object and sets the img-path
     * 
     * @param {String} path - This is the path to the current image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function draws current img of the object the fuction is called on
     * 
     * @param {Object} ctx - This is the context of the canvas 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * This function creates a new img, sets the path to it and loads the object into the cache
     * 
     * @param {Array.<String>} arr - This is the array of img-paths
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * This function is used for debugging - it helps to find the right offsets to an object
     * 
     * @param {Object} ctx - This is the context of the canvas
     */
    drawFrame(ctx) {
        if (this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        } else if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x + 10, this.y + 90, this.width - 20, this.height - 100);
            ctx.stroke();
        } else if (this instanceof CollectableObject) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x + 15, this.y + 15, this.width - 30, this.height - 30);
            ctx.stroke();
        }
    }

    /**
     * This function plays the commited audio
     * 
     * @param {Object} audio - This is the Audio object, which is played
     */
    playAudio(audio) {
        if (!soundMuted) {
            audio.play();
        }
    }
}