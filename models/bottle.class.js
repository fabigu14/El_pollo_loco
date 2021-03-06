class Bottle extends CollectableObject {

    IMAGES = [
        'img/6.botella/2.Botella_enterrada1.png',
        'img/6.botella/2.Botella_enterrada2.png'
    ];

    height = 90;
    width = 90;
    y = 345;

    constructor() {
        super();
        let position = Math.random() * 1;
        let positionRounded = Math.round(position);
        this.loadImage(this.IMAGES[positionRounded]);
        this.x = 200 + Math.random() * 2000;
    }
}