class Level{
    clouds;
    enemies;
    backgroundObjects;
    endboss;
    level_end_x = 2255;

    constructor(clouds, enemies, backgroundObjects, endboss){
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.backgroundObjects = backgroundObjects;
    }

}