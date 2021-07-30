class Level {
    clouds;
    enemies;
    backgroundObjects;
    endboss;
    level_end_x;

    constructor(level) {
            this.level_end_x = level[0];
            this.clouds = level[1];
            this.enemies = level[2];
            this.backgroundObjects = level[3];
            this.endboss = level[4];
        }
        // constructor(level_end_x, clouds, enemies, backgroundObjects, endboss) {
        //     this.level_end_x = level_end_x;
        //     this.clouds = clouds;
        //     this.enemies = enemies;
        //     this.endboss = endboss;
        //     this.backgroundObjects = backgroundObjects;
        // }

}