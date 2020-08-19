import {getUserGrid} from "../core/GameService/GameService.js";
import {saveCurrentGame} from "../core/GameService/GameService.js";
import {getSavedGame} from "../core/GameService/GameService.js";

class DataStore {

    constructor() {
    this.tempGame = [];
    this.initialGame = [];
    }

    async getSudokuArray(difficulty) {
        this.initialGame = await getUserGrid(difficulty);
        this.tempGame = [...this.initialGame];
        return this.tempGame;
    }

    async saveGame() {
       await saveCurrentGame(this.initialGame, this.tempGame);
    }

   async getCurrentSavedGame() {
        const games = await getSavedGame();
       if (!games.tempGame) {
           return games;
       }
       this.initialGame = games.initialGame;
        this.tempGame = games.tempGame;
        return this.tempGame;
    }

    setDigit(digit, index) {
        this.tempGame[index] = +digit;
    }
}

export const dataStore = new DataStore();