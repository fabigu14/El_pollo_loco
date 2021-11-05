class LevelCompleted extends DrawableObject {
    text = 'LEVEL COMPLETED!';
    canvas;
    levelIsCompleted;
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.x = this.canvas.width / 2;
        this.y = 0;
        this.animateText();
    }

    /**
     * This function animates the text in level completed screen
     */
    animateText() {
        setInterval(() => {
            if (this.levelIsCompleted && this.y <= canvas.height / 2) {
                this.y += 2;
            }
        }, 1000 / 60);
    }
}