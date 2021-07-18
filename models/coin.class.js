class Coin extends CollectableObject{

    constructor(){
        super();
        this.loadImage('img/8.Coin/Moneda1.png');
        this.x = 200 + Math.random() * 1500;
    }
}