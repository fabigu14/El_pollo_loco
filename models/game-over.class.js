class GameOver extends DrawableObject {
    text = 'GAME OVER';
    canvas;
    gameIsOver;
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.x = this.canvas.width / 2;
        this.y = 0;
        this.animateText();
    }

    animateText() {

        setInterval(() => {
            if (this.gameIsOver && this.y <= canvas.height / 2) {
                this.y += 2;
            }
        }, 1000 / 60);

    }
}