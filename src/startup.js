import {drawGame, initGame} from "./game/main";
// Declare as variable
let canvas;
let context;
let secondsPassed;
let oldTimeStamp;
let fps;
// Listen to the onLoad event
window.onload = init;


// Trigger init function when the page has loaded
function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    initGame(context);
    setInterval(() => {
        gameLoop(new Date().getTime())
    }, 17);

    context.scale(2.5, 2.5);
}


function gameLoop(timeStamp) {
    context.clearRect(0, 0, 300, 300); // clear canvas
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);

    // Draw number to the screen
    context.fillStyle = 'white';
    context.fillRect(0, 0, 200, 100);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText("FPS: " + fps, 10, 30);

    // Perform the drawing operation

    draw();
}

function draw() {
    // Get a random color, red or blue
    drawGame(context);
    context.rect(0, 0, 300, 300);
    context.strokeRect(0, 0, 300, 300);

}