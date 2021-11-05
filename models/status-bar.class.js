class StatusBar extends DrawableObject {

    height = 50;
    width = 180;
    percentage;

    /**
     * This function sets the percentage of a statusbar
     * 
     * @param {number} percentage - current percentage
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    /**
     * This function returns the index of the path that should be used from the IMAGES array
     * 
     * @returns {number} - index of img in IMAGES[]
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}