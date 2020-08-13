import {getUserGrid} from "../core/GameService/GameService.js";
import {saveUserGrid} from "../core/GameService/GameService.js";
import {getSavedGame} from "../core/GameService/GameService.js";

class DataStore {

    constructor() {
    this.sudokuArray = [];
    }

    async getSudokuArray(difficulty) {
        this.sudokuArray = await getUserGrid(difficulty);
        return this.sudokuArray;
    }

    async saveGame() {
       await saveUserGrid(this.sudokuArray);
    }

   async getSavedGame() {
        this.sudokuArray = await getSavedGame();
        return this.sudokuArray;
    }

    setDigit(digit, index) {
        this.sudokuArray[index] = digit;
    }

}

export const dataStore = new DataStore();