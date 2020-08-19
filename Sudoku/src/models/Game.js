import {dataStore} from "./DataStore.js";

export class Game {

    constructor() {
        this.currentIndex = null;
        this.setDigit = this.setDigit.bind(this);
        this.erase = this.erase.bind(this);
        this.newGame = this.newGame.bind(this);
        this.setIndex = this.setIndex.bind(this);
    }

    setDigit(digit) {
        if (this.currentIndex !== 0 && !this.currentIndex) {
           throw Error('Invalid cell');
        }

        if (!this.canSetDigitInArray(parseInt(digit), this.currentIndex, dataStore.tempGame)) {
            throw Error('Invalid digit');
        }

        dataStore.setDigit(parseInt(digit), this.currentIndex);
        if (!this.canContinueGame(dataStore.tempGame)) {
            alert('You win...!!!');
        }
        dataStore.saveGame().then(() => console.log('game saved'));
    }

    erase() {
        if (this.currentIndex !== 0 && !this.currentIndex) {
            throw Error('Invalid cell');
        }
        if (dataStore.initialGame[this.currentIndex] === dataStore.tempGame[this.currentIndex]) {
            throw Error('Invalid digit');
        }
        dataStore.setDigit(0, this.currentIndex)
    }

    async newGame(difficulty) {
        const tempGame = await dataStore.getSudokuArray(difficulty);
        await dataStore.saveGame();
        return tempGame;
    }

    setIndex(currentIndex) {
        this.currentIndex = currentIndex;
    }

    canSetDigitInRow(digit, index, arr) {
        const startPoint = (index - (index % 9));
        const endPoint = startPoint + 9;

        for(let i = startPoint; i < endPoint; i++) {
            if(digit === +arr[i]) {
                return false;
            }
        }
        return true;
    }

    canSetDigitInColumn(digit, index, arr) {
        for (let i = index % 9; i < 81; i+=9) {
            if(+arr[i] === digit) {
                return false;
            }
        }
        return true;
    }

    canSetDigitInMatrix(digit, index, arr) {
        let column = index % 9;
        let row = Math.floor(index / 9);
        let startIndex = ((row - (row % 3)) * 9) + (column - (column % 3));

        let matrixCellCount = 0;
        let matrixLoop = 0
        while(startIndex < arr.length && matrixLoop < 3){
            matrixCellCount++;
            if (+arr[startIndex] === digit) {
                return false;
            }

            if (matrixCellCount === 3){
                matrixCellCount = 0;
                matrixLoop++;
                startIndex += 7;
                continue;
            }

            startIndex++;

        }
        return true;
    }

    canSetDigitInArray(digit, index, arr) {
        return this.canSetDigitInColumn(digit, index, arr) &&
            this.canSetDigitInRow(digit, index, arr) && this.canSetDigitInMatrix(digit, index, arr);
    }

    canContinueGame(arr) {
        for(let el of arr) {
            if (el === 0) {
                return true;
            }
        }
        return false;
    }
}