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
    sound = new Sound();
    music = new Music();
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
    bottle_break = new Audio('audio/breaking_bottle.mp3');
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
    }

    /**
     * This function sets the variable world in the character class to this
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * This function checks if the game has started and sets variables on true
     */
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

    /**
     * This function creates collectable objects
     */
    setCollectalbleObjects() {
        this.createCoins();
        this.createBottles();
    }

    /**
     * This function creates the coins
     */
    createCoins() {
        let amountOfCoins = 2 + Math.random() * 8;

        for (let i = 0; i < amountOfCoins; i++) {

            this.coins.push(new Coin());
        }
    }

    /**
     * This function creates the bottles
     */
    createBottles() {
        let amountOfBottles = 5 + Math.random() * 10;

        for (let i = 0; i < amountOfBottles; i++) {

            this.bottles.push(new Bottle());
        }
    }

    /**
     * This function starts the games intervals & plays the game music
     */
    run() {
        this.runInterval = setInterval(() => {
            this.checkPlayMusic();

            this.startCheckIntervals();

        }, 200);
    }

    /**
     * This functions starts monitoring loops of the game
     */
    startCheckIntervals() {
        if (this.gameHasStarted) {
            this.checkEnemyCollisions();
            this.checkCoCollisions(this.coins);
            this.checkCoCollisions(this.bottles);
            this.checkBottleBroke();
            this.checkEndbossHit();
            this.checkThrowObjects();
            this.checkGameIsOver();
            this.checkLevelIsCompleted();
        }
    }

    /**
     * This function checks if game music is muted or not
     */
    checkPlayMusic() {
        if (this.gameHasStarted) {
            if (musicMuted) {
                this.stopMusic();
            } else {
                this.playMusic();
            }
        }
    }

    /**
     * This function plays the game music
     */
    playMusic() {
        this.game_music.volume = 0.5;
        this.game_music.play();
    }

    /**
     * This function stops the game music
     */
    stopMusic() {
        this.game_music.pause();
    }

    /**
     * This function checks if the level was completed
     */
    checkLevelIsCompleted() {
        if (this.level.endboss.isDead()) {
            clearInterval(this.runInterval);
            if (!musicMuted) {

                this.playWinningMusic();

            }
            setTimeout(() => {
                this.levelIsCompleted = true;
                this.levelCompleted.levelIsCompleted = true;
                this.restartGame();
            }, 2000);

        }
    }

    /**
     * This function plays a winning music
     */
    playWinningMusic() {
        this.winning_music.volume = 0.3;
        this.stopMusic();
        setTimeout(() => {
            this.winning_music.play();
        }, 500);

        setTimeout(() => {
            this.winning_music.pause();
        }, 6500);
    }

    /**
     * This function plays a losing music
     */
    playLosingMusic() {
        this.losing_music.volume = 0.5;
        if (!musicMuted) {
            this.losing_music.play();
            setTimeout(() => {
                this.losing_music.pause();
            }, 6000);
        }

    }

    /**
     * This function checks if the character is dead => game is over
     */
    checkGameIsOver() {
        if (this.character.isDead()) {
            clearInterval(this.runInterval);
            this.stopMusic();
            this.playLosingMusic();
            setTimeout(() => {
                this.gameIsOver = true;
                this.gameOver.gameIsOver = true;

                this.restartGame();
            }, 2000);
        }
    }

    /**
     * This function restarts the game
     */
    restartGame() {
        setInterval(() => {
            if (this.gameIsOver && this.keyboard.CLICK || this.gameIsOver && this.keyboard.ENTER || this.levelIsCompleted && this.keyboard.ENTER) {
                restartGame();
            }
        }, 1000 / 60);

    }

    /**
     * This function checks if the enboss was hit
     */
    checkEndbossHit() {
        this.throwableObjects.forEach(bottle => {
            if (this.level.endboss.isColliding(bottle)) {
                bottle.playAudio(this.bottle_break);
                this.level.endboss.hit(25);
                this.throwableObjects.splice(this.throwableObjects.indexOf(bottle));
            }
        });

    }

    /**
     * This function checks if an object the character is about to throw a bottle
     */
    checkThrowObjects() {
        if (this.keyboard.SPACE && this.bottlesCollected.length > 0) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50);

            this.bottlesCollected.splice(0, 1);
            this.throwableObjects.push(bottle);
            this.updateCoStatusBar(bottle);
        }
    }

    /**
     * Checks if a bottle is colliding with the ground or the enboss
     */
    checkBottleBroke() {
        this.throwableObjects.forEach(bottle => {
            if (bottle.isAboveGround() == false) {
                bottle.playAudio(this.bottle_break);
                this.throwableObjects.splice(this.throwableObjects.indexOf(bottle));
            }
        });
    }

    /**
     * This function checks if the charater is colliding with a co
     * 
     * @param {Array.<Object>} co - Array of collectable objects
     */
    checkCoCollisions(co) {
        co.forEach(collectableObject => {
            if (this.character.isColliding(collectableObject)) {
                collectableObject.collectObject();
                this.updateCoStatusBar(collectableObject);
            }
        });
    }

    /**
     * This function updates the statusbar of the current co
     * 
     * @param {Object} co - current collectable object
     */
    updateCoStatusBar(co) {
        if (co instanceof Coin) {
            this.coinBar.setPercentage(this.coinsCollected.length * 20);
        } else if (co instanceof Bottle) {

            this.bottleBar.setPercentage(this.bottlesCollected.length * 20);
        } else if (co instanceof ThrowableObject) {
            this.bottleBar.setPercentage(this.bottlesCollected.length * 20);
        }
    }

    /**
     * This function checks if the character is colliding with a chicken 
     */
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

    /**
     * This function adds all elements to the map
     */
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

        this.drawOverlay();

        this.drawSoundOptions();

        this.recallDraw();

    }

    /**
     * This function adds the sound options to the map
     */
    drawSoundOptions() {

        this.addToMap(this.sound);
        this.addToMap(this.music);

    }


    /**
     * This function calls draw() frequently, depending on GPU
     */
    recallDraw() {
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })

    }

    /**
     * This function draws a overlayscreen depending on the state of the game
     */
    drawOverlay() {
        if (!this.gameHasStarted) {
            this.drawStartSreen();
        }

        if (this.gameIsOver) {
            this.drawGameOver();
        }

        if (this.levelIsCompleted) {
            this.drawWinningText();
        }
    }

    /**
     * This function draws the winningscreen
     */
    drawWinningText() {
        this.drawBackground();
        this.setTextProperties();
        this.ctx.fillText(this.levelCompleted.text, this.levelCompleted.x, this.levelCompleted.y);
    }

    /**
     * This function draws the startscreen
     */
    drawStartSreen() {
        this.drawBackground();
        this.setTextProperties();
        this.ctx.fillText("Click or press enter to start", this.canvas.width / 2, this.canvas.height / 2);
    }

    /**
     * This function draws the game over screen
     */
    drawGameOver() {
        this.drawBackground();
        this.setTextProperties();
        this.ctx.fillText(this.gameOver.text, this.gameOver.x, this.gameOver.y);
    }

    /**
     * This function sets the properties of the displayed text
     */
    setTextProperties() {
        this.ctx.font = "bold 55px 'VT323', monospace";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
    }

    /**
     * This function draws the background of the diffrent screens
     */
    drawBackground() {
        this.ctx.fillStyle = "#80808073";
        this.ctx.fillRect(0, 0, 720, 480);
    }

    /**
     * This function adds the bg-objects to the map
     */
    addBackground() {
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
    }

    /**
     * This function adds the sb-objects to the map
     */
    addStatusBars() {
        this.addToMap(this.energyBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
    }

    /**
     * This function adds the game-objects to the map
     */
    addGameObjects() {
        this.addObjectToMap(this.throwableObjects);
        this.addObjectToMap(this.coins);
        this.addObjectToMap(this.bottles);
        this.addToMap(this.character);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
    }

    /**
     * This function adds a single object to the map
     * 
     * @param {Object} object - current object, which gets add to the map
     */
    addObjectToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * This function draws the single objects
     * 
     * @param {Object} mo - current object, which gets drawn
     */
    addToMap(mo) {
        if (mo.oppositeDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.oppositeDirection) {
            this.flipImageBack(mo);
        }

    }

    /**
     * This function flips an object in the opposite direction
     * 
     * @param {Object} mo - current object, which gets flipped
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); // verschiebt den Character um die die breite des Characters
        this.ctx.scale(-1, 1); //flips ctx in opposite direction by setting scaleX = -1
        mo.x = mo.x * -1;
    }

    /**
     * This function flips an object in the original direction
     * 
     * @param {Object} mo - current object, which gets flipped
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

}