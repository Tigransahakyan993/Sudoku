import {game} from "./Game.js";

class Model {
    constructor() {
        this.observers = [];
    }

    addObserver(type, func) {
        this.observers.push({type, func})
    }

    removeObserver(type) {
        const index = this.observers.findIndex(obs => obs.type === type);
        this.observers.splice(index, 1)
    }

    dispatch(type, msg) {
        this.observers.forEach(obs => {
            obs.type === type ? obs.func(msg) : null;
        })
    }

}

const model = new Model();

model.addObserver('index' ,game.setIndex);
model.addObserver('digit', game.setDigit);
model.addObserver('newGame', game.newGame);
model.addObserver('erase', game.erase);

export default model;