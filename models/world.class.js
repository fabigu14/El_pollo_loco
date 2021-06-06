class World {

    character = new Character();
    clouds = level1.clouds;
    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;
    ctx;
    canvas;
    keyboard;
    camera_x;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clears canvas
       
        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);



        //draw() is called frequently, depending on GPU
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })

    }

    addObjectToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.oppositeDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0); // verschiebt den Character um die die breite des Characters
            this.ctx.scale(-1, 1); //flips ctx in opposite direction by setting scaleX = -1
            mo.x = mo.x * -1;
            
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if (mo.oppositeDirection) {
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
    
    }
}