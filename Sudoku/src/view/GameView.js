import {Game} from "../models/Game.js";
import {dataStore} from "../models/DataStore.js";
import {BoardView} from "./BoardView.js";
import {NumPadView} from "./NumPadView.js";
import {DifficultyView} from "./DifficultyView.js";
import {ScoreView} from "./ScoreView.js";
import {
    DATA_TYPE,
    VIEW_TYPE,
    CELL_SELECTED_EVENT,
    NEW_GAME_SELECTED_EVENT,
    NUMPAD_SELECTED_EVENT,
} from "../core/constants/CONSTANTS.js";

export class GameView {

    constructor () {
        this.observers = [];
        this.selectedBoardIndex = null;
        this.boardView = new BoardView();
        this.numpad = new NumPadView();
        this.scoreView = new ScoreView();
        this.difficultyView = new DifficultyView();
        this.game = new Game();
        this.onNumpadNumberSelected = this.onNumpadNumberSelected.bind(this);
        this.onBoardIndexSelected = this.onBoardIndexSelected.bind(this);
        this.onDifficultySelected = this.onDifficultySelected.bind(this);

        this.numpad.observable.addObserver(NUMPAD_SELECTED_EVENT, this.onNumpadNumberSelected);
        this.numpad.observable.addObserver(NEW_GAME_SELECTED_EVENT, this.onDifficultySelected);
        this.boardView.observable.addObserver(CELL_SELECTED_EVENT, this.onBoardIndexSelected);
        this.difficultyView.observable.addObserver(NEW_GAME_SELECTED_EVENT, this.onDifficultySelected);
    }

    onNumpadNumberSelected(digit) {
        if (!digit) {
            if (this.selectedBoardIndex) {
                document.getElementById(`index_${this.selectedBoardIndex}`).innerText = '';
                this.game.erase();
            }
            return;
        }
        if (this.game.canSetDigitInArray(digit, this.selectedBoardIndex, dataStore.tempGame))
        this.game.setDigit(digit);
        if (!this.game.canContinueGame(dataStore.tempGame)) {
            this.game.newGame(this.difficultyView.select.value)
                .then(data => {
                    this.notify(DATA_TYPE, data);
                    this.notify(VIEW_TYPE, null)
                })
        }
        this.notify(DATA_TYPE, dataStore.tempGame)
    }

    onBoardIndexSelected(index) {
        this.selectedBoardIndex = index;
        this.game.setIndex(index);
    }

    onDifficultySelected(difficulty) {
        this.game.newGame(difficulty)
            .then(sudokuArray => {
                this.notify(DATA_TYPE, sudokuArray);
                this.notify(VIEW_TYPE, null);
            })
    }

    addObserver(type, func) {
        this.observers.push({type, func});
    }

    removeObserver(obs) {
        const index = this.observers.findIndex(obs);
        this.observers.splice(index, 1);
    }

    notify(type, data) {
        this.observers.forEach(obs => {
            obs.type === type ? obs.func(data) : null;
        })
    }
}