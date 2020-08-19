import Observable from "../models/Observable.js";
import {NEW_GAME_SELECTED_EVENT, NUMPAD_SELECTED_EVENT} from "../core/constants/CONSTANTS.js";

export class NumPadView {

    constructor() {
        this.observable = new Observable();
        this.isExist = false;
        this.render = this.render.bind(this)
        this.dispatchDigit = this.dispatchDigit.bind(this)
        this.dispatchErase = this.dispatchErase.bind(this)
        this.dispatchDigit = this.dispatchDigit.bind(this)
        this.dispatchNewGame = this.dispatchNewGame.bind(this)
    }

    render() {
        if (!this.isExist) {
            this.create();
            this.isExist = true;
        }
    }

    create() {
        this.container = document.createElement('div');
        this.container.classList.add('numpad');
        const button = document.createElement('button');
        button.innerText = 'New Game';
        button.className = 'btn btn-primary btn-lg';
        button.addEventListener('click',  this.dispatchNewGame);
        this.container.appendChild(button);
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.classList.add('numpadRow');
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('numpadCell');
                row.appendChild(cell);
                cell.innerText = `${i * 3 + j + 1}`;
                cell.addEventListener('click', this.dispatchDigit);
            }
            this.container.appendChild(row);
        }
        const erase = document.createElement('button');
        erase.innerText = 'Erase';
        erase.classList.add('btn');
        erase.classList.add('btn-primary');
        erase.addEventListener('click', this.dispatchErase);

        this.container.appendChild(erase);
        const root = document.getElementById('root');

        root.appendChild(this.container);
    }

    dispatchDigit (e) {
        const number = e.target.innerText;
        this.observable.dispatch(NUMPAD_SELECTED_EVENT, number);
    }

    dispatchNewGame() {
        const difficulty = document.getElementById('difficultyId');
        this.observable.dispatch(NEW_GAME_SELECTED_EVENT, difficulty.value);
    }

    dispatchErase() {
        this.observable.dispatch(NUMPAD_SELECTED_EVENT, null)
    }
}

const numpad = new NumPadView();

export default numpad;