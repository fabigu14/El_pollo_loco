class World {

    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x;
    energyBar = new EnergyBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    coins = [];
    bottles = [];
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.setCollectalbleObjects();
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    setCollectalbleObjects(){
        this.createCoins();
        this.createBottles();
    }

    createCoins(){
        let amountOfCoins = 2 + Math.random() * 3;
    
        for (let i = 0; i < amountOfCoins; i++) {
            
            this.coins.push(new Coin());
        }
    }

    createBottles(){
        let amountOfBottles = 5 + Math.random() * 12;

        for (let i = 0; i < amountOfBottles; i++) {
            
            this.bottles.push(new Bottle());
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50)
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.energyBar.setPercentage(this.character.energy);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clears canvas

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        //space for position fixed elements
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.energyBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.throwableObjects);
        this.addObjectToMap(this.coins);
        this.addObjectToMap(this.bottles);  
        this.addToMap(this.character);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.level.endboss);

        this.ctx.translate(-this.camera_x, 0);

        //draw() is called frequently, depending on GPU
        let self = this;
        requestAnimationFrame(function() {
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
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);


        if (mo.oppositeDirection) {
            this.flipImageBack(mo);
        }

    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); // verschiebt den Character um die die breite des Characters
        this.ctx.scale(-1, 1); //flips ctx in opposite direction by setting scaleX = -1
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}