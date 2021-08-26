class CollectableObject extends DrawableObject {

    collect_coin = new Audio('audio/coin2.mp3');

    collectObject() {
        if (this instanceof Coin) {
            this.collect_coin.play();
            world.coinsCollected.push(this);
            this.removeObjectFromMap(world.coins);
        } else if (this instanceof Bottle) {
            world.bottlesCollected.push(this);
            this.removeObjectFromMap(world.bottles);
        }
    }

    removeObjectFromMap(array) {
        let index = array.indexOf(this);
        array.splice(index, 1);
    }
}