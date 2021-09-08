let canvas;
let world;
let keyboard = new Keyboard();
let isFullscreen = false;
let musicMuted = false;
let soundMuted = false;

function init() {

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function restartGame() {
    location.reload();
}

function setFullscreen() {
    canvas.requestFullscreen();
    isFullscreen = true;
}

window.addEventListener('mousedown', function(e) {
    //React to the mouse down event

    if (isClickOnCanvas(e)) {
        keyboard.CLICK = true;
    }
});


function isClickOnCanvas(e) {
    let rect = canvas.getBoundingClientRect();

    return (e.x > rect.x) && (e.x < (rect.x + rect.width)) &&
        (e.y > rect.y) && (e.y < (rect.y + rect.height));

}

window.addEventListener('mouseup', function(e) {
    // React to the mouse down event
    keyboard.CLICK = false;
});

window.addEventListener('keydown', e => {

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 13) {
        keyboard.ENTER = true;
    }
});


window.addEventListener('keyup', e => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 13) {
        keyboard.ENTER = false;
    }
});