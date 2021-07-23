class Startscreen extends DrawableObject {

    background;

    constructor() {
        super();
        this.addBackground();
    }

    addBackground() {
        this.background = [new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
            new BackgroundObject('img//5.Fondo//Capas//3.Fondo3/1.png', 0),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0)
        ];
    }
}