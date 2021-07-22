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
    coinsCollected = [];
    bottles = [];
    bottlesCollected = [];
    throwableObjects = [];
    gameHasStarted = false;
    gameOver = false;

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

    setCollectalbleObjects() {
        this.createCoins();
        this.createBottles();
    }

    createCoins() {
        let amountOfCoins = 2 + Math.random() * 3;

        for (let i = 0; i < amountOfCoins; i++) {

            this.coins.push(new Coin());
        }
    }

    createBottles() {
        let amountOfBottles = 5 + Math.random() * 12;

        for (let i = 0; i < amountOfBottles; i++) {

            this.bottles.push(new Bottle());
        }
    }

    run() {
        setInterval(() => {
            this.checkEnemyCollisions();
            this.checkCoCollisions(this.coins);
            this.checkCoCollisions(this.bottles);
            this.checkEndbossHit();
            this.checkThrowObjects();
        }, 200);
    }

    checkEndbossHit() {
        this.throwableObjects.forEach(bottle => {
            if (this.level.endboss.isColliding(bottle)) {
                this.level.endboss.hit(50);
                this.throwableObjects.splice(this.throwableObjects.indexOf(bottle));
            }
        });

    }

    checkThrowObjects() {
        if (this.keyboard.SPACE && this.bottlesCollected.length > 0) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50);
            this.bottlesCollected.splice(0, 1);
            this.throwableObjects.push(bottle);
            this.updateCoStatusBar(bottle);
        }
    }

    checkCoCollisions(co) {
        co.forEach(collectableObject => {
            if (this.character.isColliding(collectableObject)) {
                let index = co.indexOf(collectableObject);
                this.updateCoStatusBar(collectableObject);
                co.splice(index, 1);
            }
        });
    }

    updateCoStatusBar(co) {
        if (co instanceof Coin) {
            this.addToCollected(this.coinsCollected, co);
            this.coinBar.setPercentage(this.coinsCollected.length * 20);
        } else if (co instanceof Bottle) {
            this.addToCollected(this.bottlesCollected, co);
            this.bottleBar.setPercentage(this.bottlesCollected.length * 20);
        } else if (co instanceof ThrowableObject) {
            this.bottleBar.setPercentage(this.bottlesCollected.length * 20);
        }
    }

    addToCollected(arr, co) {
        arr.push(co);
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(5);
                this.energyBar.setPercentage(this.character.energy);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clears canvas

        this.ctx.translate(this.camera_x, 0);

        this.addBackground();
        //space for position fixed elements
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBars();
        this.ctx.translate(this.camera_x, 0);

        this.addGameObjects();

        this.ctx.translate(-this.camera_x, 0);

        //draw() is called frequently, depending on GPU
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })

    }

    addBackground() {
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
    }

    addStatusBars() {
        this.addToMap(this.energyBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
    }

    addGameObjects() {
        this.addObjectToMap(this.throwableObjects);
        this.addObjectToMap(this.coins);
        this.addObjectToMap(this.bottles);
        this.addToMap(this.character);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
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