const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fps = 60


function getNextFrameNumber(frameNumber, framesAmount) {
    if (frameNumber < framesAmount) {
        return frameNumber + 1;
    }
    return 0;
}

class Knight {
    x;
    y;
    image = new Image();
    ctx;
    path;
    frameNumber = 0;
    state;

    constructor(ctx, x, y) {
        this.path = './resources/frames/knight_m_idle_anim_f0.png'
        this.ctx = ctx;
        this.image.src = this.path;
        this.x = x;
        this.y = y;
        this.state = 'idle';

        document.addEventListener('keydown', (event) => {
            this.state = 'run';
            if (event.code === 'ArrowRight') {
                this.x += 3;
            } else if (event.code === 'ArrowLeft') {
                this.x -= 3;
            } else if (event.code === 'ArrowUp') {
                this.y -= 3;
            } else if (event.code === 'ArrowDown') {
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
            // ctx.scale(-2,2);
        }
    }

    drawIdle() {
        this.drawAnimation('lizard_m_idle_anim_f', 30, 3);
    }

    drawRun() {
        this.drawAnimation('lizard_m_run_anim_f', 5, 3);
    }

    draw() {
        if (this.state === 'idle') {
            this.drawIdle();
        } else if (this.state === 'run') {
            this.drawRun();
        }
        this.ctx.drawImage(this.image, this.x, this.y);
        this.frameNumber++;
    }

}

const k = new Knight(ctx, 50, 50)


function draw(ctx, offsetx, offsety) {

    ctx.clearRect(0, 0, 600, 600); // clear canvas

    k.draw();
    ctx.rect(0, 0, 200, 200);
    ctx.stroke();

}

function gameLoop() {
    let ox = 50
    let oy = 50

    ctx.scale(3, 3)

    setInterval(() => {
        draw(ctx, ox, oy)

    }, 1000 / fps)
}


gameLoop()