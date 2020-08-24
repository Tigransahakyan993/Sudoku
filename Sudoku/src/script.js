import {GameView} from "./view/GameView.js";

window.onload = main;

function main() {
    const gameView = new GameView();

    gameView.initialize().then(() => console.log('Game Started...!!!'))
}
