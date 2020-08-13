import {board} from "./BoardView.js";
import {score} from "./ScoreView.js";
import {difficulty} from "./DifficultyView.js";
import numpad from "./NumPadView.js";

class GameView {

    constructor() {
        this.observers = [];
    }

    addObserver(type, func) {
        this.observers.push({type, func})
    }

    removeObserver(obs) {
        const index = this.observers.findIndex(obs);
        this.observers.splice(index, 1);
    }

    notify(type, data) {
        this.observers.forEach(obs => {
            obs.type === type ? obs.func(data) : null
        })
    }
}

const account = new GameView();

account.addObserver('data', board.setData);
account.addObserver('view', numpad.render);
account.addObserver('view', difficulty.render);
account.addObserver('view', score.render);

export default account;