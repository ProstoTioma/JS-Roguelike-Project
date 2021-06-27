import {Character} from "./character";
let player;
let context;

function initGame(ctx) {
    context = ctx;
    player = new Character(context, 50, 50);
}

function drawGame(context) {
    player.draw();
}

export { drawGame, initGame }