class World {

    character = new Character();
    clouds = [
        new Cloud()
    ];
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    backgroundObjects = [
        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
        new BackgroundObject('img//5.Fondo//Capas//3.Fondo3/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0)
    ];

    ctx;
    canvas;
    keyboard;

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

        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectToMap(this.enemies);



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
            this.ctx.translate(mo.width, 0); // versetzt Character um die übergebenen (x, y) Werte
            this.ctx.scale(-1, 1); //flips Character in opposite direction by setting scaleX = -1
            mo.x = mo.x * -1;
            
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if (mo.oppositeDirection) {
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
        

    }
}