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


function init() {

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    canvasInfo = canvas.getBoundingClientRect();
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
    console.log(e);

    if (isClickOnCanvas(e)) {
    
        keyboard.CLICK = true;
    }
    if(isClickOnMusic(e)){
        setMusicState();
    }
    if(isClickOnSound(e)){
        setSoundState();
    }
});

function setSoundState(){
    if(soundMuted){
        soundMuted = false;
    }
    else{
        soundMuted = true;
    }
}

function setMusicState(){
    if(musicMuted){
        musicMuted = false;
    }
    else{
        musicMuted = true;
    }
}

function isClickOnSound(e){
    rect = canvas.getBoundingClientRect();
    checkRatio(rect);
    calculateFactors(rect);

    return (e.x > (rect.x + (670 * factorX))) && (e.x < (rect.x + (702 * factorX))) &&
        (e.y > (rect.y + (8 * factorY))) && (e.y < (rect.y + (40 * factorY)));
}

function isClickOnMusic(e){
    rect = canvas.getBoundingClientRect();
    checkRatio(rect);
    calculateFactors(rect);
    return (e.x > (rect.x + 630 * factorX)) && (e.x < (rect.x + 662 * factorX)) &&
        (e.y > (rect.y + 8 * factorY)) && (e.y < (rect.y + 40 * factorY));
}

function isClickOnCanvas(e) {
    rect = canvas.getBoundingClientRect();
    
    calculateFactors(rect);

    return (e.x > rect.x) && (e.x < (rect.x + rect.width)) &&
        (e.y > rect.y) && (e.y < (rect.y + rect.height));

}

function checkRatio(rect) {
    let ratio = rect.width / rect.height;
    let roundedRatio = Math.round(ratio * 10) / 10;
    if(roundedRatio < 1.5){
        adjustY(rect);
    }
    else if(roundedRatio > 1.5){
        adjustX(rect);
    }
}

function adjustY(rect) {
    let height = rect.width / 1.5;
    rect.y = (rect.height - height) / 2;
    rect.height = height;
}

function adjustX(rect) {
    let width = rect.height * 1.5;
    rect.x = (rect.width - width) / 2;
    rect.width = width;
}

function calculateFactors(rect){
    factorX = rect.width / canvasInfo.width;
    
    factorY = rect.height / canvasInfo.height;
    
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