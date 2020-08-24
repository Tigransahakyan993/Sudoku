import {NEW_GAME_SELECTED_EVENT} from "../constants/CONSTANTS.js";
import Observable from "../models/Observable.js";

export class DifficultyView {
    constructor() {
        this.observable = new Observable();
        this.isExist = false;
        this.dispatchDifficulty = this.dispatchDifficulty.bind(this);
        this.render = this.render.bind(this);
    }

    render(){
        if (!this.isExist) {
            this.create();
            this.isExist = true;
        }
    }

    create () {
    this.container = document.createElement('div');
    this.container.classList.add('difficulty-section');
    this.select = document.createElement('select');
    const difLabel = document.createElement('label');
    const easy = document.createElement('option');
    const medium = document.createElement('option');
    const hard = document.createElement('option');
    this.select.setAttribute('id', 'difficultyId');
    difLabel.innerText = 'Difficulty  :';
    difLabel.setAttribute('for', 'difficultyId');
    easy.setAttribute('value', 'easy');
    medium.setAttribute('value', 'medium');
    hard.setAttribute('value', 'hard');
    easy.innerText = 'Easy';
    medium.innerText = 'Medium';
    hard.innerText = 'Hard';
    this.select.appendChild(easy);
    this.select.appendChild(medium);
    this.select.appendChild(hard);
    this.select.addEventListener('change',  this.dispatchDifficulty);
        this.container.appendChild(difLabel);
    this.container.appendChild(this.select);
        document.getElementById('root').appendChild(this.container);
    }

    dispatchDifficulty(event) {
        this.observable.dispatch(NEW_GAME_SELECTED_EVENT, event.target.value);
    }
}