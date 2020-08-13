import model from "../model.js";

class DifficultyView {
    constructor() {
        this.isExist = false;
        this.render = this.render.bind(this)
    }

    render(){
        if (!this.isExist) {
            this.create();
            this.isExist = true;
        }
    }

    create () {
    this.container = document.createElement('div');
    this.container.classList.add('difficulty-section')
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
        model.dispatch('newGame', event.target.value);
    }
}

export const difficulty = new DifficultyView();