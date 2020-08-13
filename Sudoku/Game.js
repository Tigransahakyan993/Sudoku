import {dataStore} from "./classes/DataStore.js";
import account from "./classes/GameView.js";
import {can} from "./classes/Can.js";

class Game {
    constructor() {
        this.currentIndex = null;
        this.setDigit = this.setDigit.bind(this);
        this.erase = this.erase.bind(this);
        this.newGame = this.newGame.bind(this);
        this.setIndex = this.setIndex.bind(this);
    }

    setDigit(digit) {
        if (this.currentIndex !== null) {
            if(!can.setDigitInArray(+digit, this.currentIndex, dataStore.sudokuArray) || typeof dataStore.sudokuArray[this.currentIndex] !== 'string') {
                return;
            }
            dataStore.setDigit(digit, this.currentIndex);
            account.notify('data', dataStore.sudokuArray);
            dataStore.saveGame().then(r => console.log(r));
        }
        if (!can.continueGame(dataStore.sudokuArray)) {
            alert('You win...!!!');
        }
    }

    erase() {
        if (this.currentIndex !== null && typeof dataStore.sudokuArray[this.currentIndex] !== 'number') {
            dataStore.setDigit('0', this.currentIndex);
            account.notify('data', dataStore.sudokuArray);
        }
    }

    async newGame(difficulty) {
        const data = await dataStore.getSudokuArray(difficulty);
        account.notify('data', data);
        account.notify('view',null);
        await dataStore.saveGame();
    }

    setIndex(currentIndex) {
        this.currentIndex = currentIndex;
    }
}




export const game = new Game();



