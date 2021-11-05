class CollectableObject extends DrawableObject {

    collect_coin = new Audio('audio/coin2.mp3');
    collect_bottle = new Audio('audio/collect_bottle.mp3');
    offsetX = 15;
    offsetY = 15;
    offsetWidth = 30;
    offsetHeight = 30;

    /**
     * This function checks if this is instance of Coin or Bottle
     */
    collectObject() {
        if (this instanceof Coin) {
            this.collectCoin();
        } else if (this instanceof Bottle) {
            this.collectBottle();
        }
    }

    /**
     * This function is used to collect the coins
     */
    collectCoin() {
        this.playAudio(this.collect_coin);
        world.coinsCollected.push(this);
        this.removeObjectFromMap(world.coins);
    }

    /**
     * This function is used to collect the bottles
     */
    collectBottle() {
        this.playAudio(this.collect_bottle);
        world.bottlesCollected.push(this);
        this.removeObjectFromMap(world.bottles);
    }

    /**
     * This function removes the collected object from the map
     * 
     * @param {Array.<Object>} co - This is the array from which the collectable object gets removed
     */
    removeObjectFromMap(co) {
        let index = co.indexOf(this);
        co.splice(index, 1);
    }
}