class Level {
    clouds;
    enemies;
    backgroundObjects;
    endboss;
    level_end_x;

    constructor(level_end_x, clouds, enemies, backgroundObjects, endboss) {
        this.level_end_x = level_end_x;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.backgroundObjects = backgroundObjects;
    }

}