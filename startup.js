function getNextFrameNumber(frameNumber, framesAmount) {
    if (frameNumber < framesAmount) {
        return frameNumber + 1;
    }
    return 0;
}

class Character {
    x;
    y;
    image = new Image();
    ctx;
    path = '';
    frameNumber = 0;
    state;

    constructor(context, x, y) {
        this.ctx = context;
        this.image.src = this.path;
        this.x = x;
        this.y = y;
        this.state = 'idle';

        document.addEventListener('keydown', (event) => {

            if (event.code === 'ArrowRight') {
                this.state = 'run';
                this.x += 3;
            } else if (event.code === 'ArrowLeft') {
                this.state = 'run';
                this.x -= 3;
            } else if (event.code === 'ArrowUp') {
                this.state = 'run';
                this.y -= 3;
            } else if (event.code === 'ArrowDown') {
                this.state = 'run';
                this.y += 3;
            }
            console.log(event);
        });

        document.addEventListener('keyup', (event) => {
            if (event.code === 'ArrowRight') {
                this.state = 'idle';
            } else if (event.code === 'ArrowLeft') {
                this.state = 'idle';
            } else if (event.code === 'ArrowUp') {
                this.state = 'idle';
            } else if (event.code === 'ArrowDown') {
                this.state = 'idle';

            }
            console.log(event);
        });
    }

    drawAnimation(name, speed, frames) {
        if (this.frameNumber % speed === 0) {
            const imgName = this.path.replaceAll('.png', '');
            const frameNumber = Number(imgName.charAt(imgName.length - 1));
            const nextFrameNumber = getNextFrameNumber(frameNumber, frames);
            this.path = `./resources/frames/${name}${nextFrameNumber}.png`;
            this.image.src = this.path;
        }
    }

    drawIdle() {
        this.drawAnimation('knight_m_idle_anim_f', 5, 3);
    }

    drawRun() {
        this.drawAnimation('knight_m_run_anim_f', 5, 3);
    }

    draw() {


        if (this.state === 'idle') {
            this.drawIdle();
        } else if (this.state === 'run') {
            this.drawRun();
        }
        this.ctx.drawImage(this.image, this.x, this.y);
        if (this.frameNumber === 5) this.frameNumber = 0;
        this.frameNumber++;

    }

}
// Declare as variable
let canvas;
let context;
let secondsPassed;
let oldTimeStamp;
let fps;

// Listen to the onLoad event
window.onload = init;
let k;



// Trigger init function when the page has loaded
function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    // Request an animation frame for the first time
    // The gameLoop() function will be called as a callback of this request
    window.requestAnimationFrame(gameLoop);

    k = new Character(context, 50, 50);
    context.scale(3, 3);
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

    // The loop function has reached it's end
    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function draw() {
    // Get a random color, red or blue


    k.draw();
    context.rect(0, 0, 300, 300);
    context.strokeRect(0, 0, 300, 300);


    // context.fillStyle = Math.random() > 0.5 ? '#ff8080' : '#0099b0';
    //
    // // Draw a rectangle on the canvas
    // context.fillRect(100, 50, 200, 175);
}