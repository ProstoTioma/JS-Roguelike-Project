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
        this.drawAnimation('knight_m_idle_anim_f', 15, 3);
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
        this.frameNumber++;

    }

}

export { Character }