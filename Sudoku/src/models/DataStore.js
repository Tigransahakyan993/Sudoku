import {getNewGame} from "../service/GameService/GameService.js";
import {saveCurrentGame} from "../service/GameService/GameService.js";
import {getSavedGame} from "../service/GameService/GameService.js";

export class DataStore {

    constructor() {
    this.tempGame = [];
    this.initialGame = [];
    }

    async getSudokuArray(difficulty) {
        this.initialGame = await getNewGame(difficulty);
        this.tempGame = [...this.initialGame];
        return this.tempGame;
    }

    async saveGame() {
       await saveCurrentGame(this.initialGame, this.tempGame);
    }

   async getCurrentSavedGame() {
        const game = await getSavedGame();
       if (!game.tempGame) {
           this.initialGame = game;
           this.tempGame = [...this.initialGame];
           return this.tempGame;
       }
       this.initialGame = game.initialGame;
        this.tempGame = game.tempGame;
        return this.tempGame;
    }

    setDigit(digit, index) {
        this.tempGame[index] = +digit;
    }
}