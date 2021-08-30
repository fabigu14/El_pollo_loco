class World {

    character = new Character();
    ctx;
    level;
    gameOver = new GameOver(canvas);
    levelCompleted = new LevelCompleted(canvas);
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
    gameIsOver = false;
    levelIsCompleted = false;
    game_music = new Audio('audio/music1.mp3');
    winning_music = new Audio('audio/mariachi.mp3');
    losing_music = new Audio('audio/sad_trumpet.mp3');
    runInterval;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = new Level(level1);
        this.setWorld();
        this.setCollectalbleObjects();
        this.checkGameHasStarted();
        this.draw();
        this.run();
        // this.runInterval = setInterval(this.run, 200);
    }


    setWorld() {
        this.character.world = this;
    }

    checkGameHasStarted() {
        setInterval(() => {
            if (this.keyboard.ENTER || this.keyboard.CLICK) {
                this.gameHasStarted = true;
                this.character.gameHasStarted = true
                let chicken = this.level.enemies;
                chicken.forEach(enemy => {
                    enemy.gameHasStarted = true;
                });
                let clouds = this.level.clouds;
                clouds.forEach(cloud => {
                    cloud.gameHasStarted = true;
                });
            }
        }, 1000 / 60);

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
        this.runInterval = setInterval(() => {
            if (this.gameHasStarted) {
                this.playMusic();
            }

            if (this.gameHasStarted) {
                this.checkEnemyCollisions();
                this.checkCoCollisions(this.coins);
                this.checkCoCollisions(this.bottles);
                this.checkEndbossHit();
                this.checkThrowObjects();
                this.checkGameIsOver();
                this.checkLevelIsCompleted();
            }
        }, 200);
    }

    playMusic() {
        if (this.gameHasStarted) {
            this.game_music.play();
        }
    }

    stopMusic() {
        this.game_music.pause();
    }

    checkLevelIsCompleted() {
        if (this.level.endboss.isDead()) {
            clearInterval(this.runInterval);
            this.stopMusic();
            setTimeout(() => {
                this.playWinningMusic();
            }, 500);

            setTimeout(() => {
                this.levelIsCompleted = true;
                this.levelCompleted.levelIsCompleted = true;
                this.restartGame();
            }, 2000);

        }
    }

    playWinningMusic() {

        this.winning_music.play();

        setTimeout(() => {
            this.winning_music.pause();
        }, 6500);
    }

    playLosingMusic() {
        this.losing_music.play();
        setTimeout(() => {
            this.losing_music.pause();
        }, 6000);
    }

    checkGameIsOver() {
        if (this.character.isDead()) {
            this.stopMusic();
            this.playLosingMusic();
            setTimeout(() => {
                this.gameIsOver = true;
                this.gameOver.gameIsOver = true;
                // clearInterval(this.runInterval);
                this.restartGame();
            }, 2000);

        }
    }

    restartGame() {
        setInterval(() => {
            if (this.gameIsOver && this.keyboard.CLICK || this.gameIsOver && this.keyboard.ENTER || this.levelIsCompleted && this.keyboard.ENTER) {
                restartGame();
            }
        }, 1000 / 60);

    }

    resetChicken() {
        this.level.enemies.forEach(enemy => {
            enemy.x = 200 + Math.random() * 500;
        });
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
                collectableObject.collectObject();
                this.updateCoStatusBar(collectableObject);
            }
        });
    }

    updateCoStatusBar(co) {
        if (co instanceof Coin) {

            this.coinBar.setPercentage(this.coinsCollected.length * 20);
        } else if (co instanceof Bottle) {

            this.bottleBar.setPercentage(this.bottlesCollected.length * 20);
        } else if (co instanceof ThrowableObject) {
            this.bottleBar.setPercentage(this.bottlesCollected.length * 20);
        }
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(5);
                this.energyBar.setPercentage(this.character.energy);
            }
        });
        if (this.character.isColliding(this.level.endboss)) {
            this.character.hit(20);
            this.energyBar.setPercentage(this.character.energy);
        }
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
        if (!this.gameHasStarted) {
            this.drawStartSreen();
        }

        if (this.gameIsOver) {
            this.drawGameOver();
        }

        if (this.levelIsCompleted) {
            this.drawWinningText();
        }

        //draw() is called frequently, depending on GPU
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })

    }

    drawWinningText() {
        this.drawBackground();
        this.setTextProperties();
        this.ctx.fillText(this.levelCompleted.text, this.levelCompleted.x, this.levelCompleted.y);
    }

    drawStartSreen() {
        this.drawBackground();
        this.setTextProperties();
        this.ctx.fillText("Click or press enter to start", this.canvas.width / 2, this.canvas.height / 2);
    }

    drawGameOver() {
        this.drawBackground();
        this.setTextProperties();
        this.ctx.fillText(this.gameOver.text, this.gameOver.x, this.gameOver.y);
    }

    setTextProperties() {
        this.ctx.font = "bold 55px 'VT323', monospace";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
    }

    drawBackground() {
        this.ctx.fillStyle = "#80808073";
        this.ctx.fillRect(0, 0, 720, 480);
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