class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 200;
    height = 70;
    width = 70;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

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
}