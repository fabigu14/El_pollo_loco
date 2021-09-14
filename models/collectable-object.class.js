class CollectableObject extends DrawableObject {

    collect_coin = new Audio('audio/coin2.mp3');
    collect_bottle = new Audio('audio/collect_bottle.mp3');
    offsetX = 15;
    offsetY = 15;
    offsetWidth = 30;
    offsetHeight = 30;

    collectObject() {
        if (this instanceof Coin) {
            this.collectCoin();
        } else if (this instanceof Bottle) {
            this.collectBottle();
        }
    }

    collectCoin() {
        this.playAudio(this.collect_coin);
        world.coinsCollected.push(this);
        this.removeObjectFromMap(world.coins);
    }

    collectBottle() {
        this.playAudio(this.collect_bottle);
        world.bottlesCollected.push(this);
        this.removeObjectFromMap(world.bottles);
    }

    removeObjectFromMap(array) {
        let index = array.indexOf(this);
        array.splice(index, 1);
    }
}