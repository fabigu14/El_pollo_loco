let canvas;
let world;
let keyboard = new Keyboard();
let isFullscreen = false;
let musicMuted = false;
let soundMuted = false;
let fullScreenFactor;
let canvasInfo;
let factorX;
let factorY;
let rect;

/**
 * This function initializes the game
 */
function init() {

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    canvasInfo = canvas.getBoundingClientRect();
}

/**
 * This function restarts the game
 */
function restartGame() {
    location.reload();
}

/**
 * This functions set the canvas to fullscreen
 */
function setFullscreen() {

    canvas.requestFullscreen();
    isFullscreen = true;

}

/**
 * This function adds an eventListener if the mouse was clicked
 */
window.addEventListener('mousedown', function(e) {
    //React to the mouse down event
    console.log(e);

    if (isClickOnCanvas(e)) {

        keyboard.CLICK = true;
    }
    if (isClickOnMusic(e)) {
        setMusicState();
    }
    if (isClickOnSound(e)) {
        setSoundState();
    }
});

/**
 * This function sets the state of the game sound
 */
function setSoundState() {
    if (soundMuted) {
        soundMuted = false;
    } else {
        soundMuted = true;
    }
}

/**
 * This function sets the state of the game music
 */
function setMusicState() {
    if (musicMuted) {
        musicMuted = false;
    } else {
        musicMuted = true;
    }
}

/**
 * This function checks if the sound icon was clicked
 * 
 * @param {Event} e - current event
 * @returns {boolean}
 */
function isClickOnSound(e) {
    rect = canvas.getBoundingClientRect();

    if (!isMobileScreen()) {
        checkRatio(rect);
    }

    calculateFactors(rect);

    return (e.x > (rect.x + (670 * factorX))) && (e.x < (rect.x + (702 * factorX))) &&
        (e.y > (rect.y + (8 * factorY))) && (e.y < (rect.y + (40 * factorY)));
}

/**
 * This function checks if the music icon was clicked
 * 
 * @param {Event} e - current event
 * @returns {boolean}
 */
function isClickOnMusic(e) {
    rect = canvas.getBoundingClientRect();
    if (!isMobileScreen()) {
        checkRatio(rect);
    }

    calculateFactors(rect);
    return (e.x > (rect.x + 630 * factorX)) && (e.x < (rect.x + 662 * factorX)) &&
        (e.y > (rect.y + 8 * factorY)) && (e.y < (rect.y + 40 * factorY));
}

/**
 * This function checks if click was on canvas
 * 
 * @param {Event} e - current event
 * @returns {boolean}
 */
function isClickOnCanvas(e) {
    rect = canvas.getBoundingClientRect();

    return (e.x > rect.x) && (e.x < (rect.x + rect.width)) &&
        (e.y > rect.y) && (e.y < (rect.y + rect.height));

}

/**
 * This function checks if current view is mobile view
 * 
 * @returns {boolean}
 */
function isMobileScreen() {
    return screen.width < 720 || screen.height < 480;
}

/**
 * This function checks ratio of the canvas
 * 
 * @param {Object} rect - current boundaries of canvas
 */
function checkRatio(rect) {
    let ratio = rect.width / rect.height;
    let roundedRatio = Math.round(ratio * 10) / 10;
    if (roundedRatio < 1.5) {
        adjustY(rect);
    } else if (roundedRatio > 1.5) {
        adjustX(rect);
    }
}

/**
 * This function scales the y-axis of the actual game screen
 * 
 * @param {Object} rect - current boundaries of canvas
 */
function adjustY(rect) {
    let height = rect.width / 1.5;
    rect.y = (rect.height - height) / 2;
    rect.height = height;
}

/**
 * This function scales the x-axis of the actual game screen for onclick event
 * 
 * @param {Object} rect - current boundaries of canvas
 */
function adjustX(rect) {
    let width = rect.height * 1.5;
    rect.x = (rect.width - width) / 2;
    rect.width = width;
}

/**
 * This function calculates the factors to get the actual game screen for onclclick event
 * 
 * @param {Object} rect - current boundaries of canvas
 */
function calculateFactors(rect) {
    if (isMobileScreen()) {
        factorX = rect.width / 720;
        factorY = rect.height / 480;
    } else {
        factorX = rect.width / canvasInfo.width;
        factorY = rect.height / canvasInfo.height;

    }
}

/**
 * This function adds an eventlistener on mouseup event
 */
window.addEventListener('mouseup', function(e) {
    // React to the mouse down event
    keyboard.CLICK = false;
});

/**
 * This function adds an eventlistener if a key is pressed
 */
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

/**
 * This function adds an eventlistener if a key is released
 */
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