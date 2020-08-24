import {Game} from "../models/Game.js";
import {BoardView} from "./BoardView.js";
import {NumPadView} from "./NumPadView.js";
import {DifficultyView} from "./DifficultyView.js";
import {ScoreView} from "./ScoreView.js";
import {
    CELL_SELECTED_EVENT,
    NEW_GAME_SELECTED_EVENT,
    NUMPAD_SELECTED_EVENT,
} from "../constants/CONSTANTS.js";

export class GameView {

    constructor () {
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

    async initialize() {
        const data = await this.game.dataStore.getCurrentSavedGame();
        this.boardView.setData(data);
        this.setClassToBoard();
        this.numpad.render();
        this.scoreView.render();
        this.difficultyView.render();
    }

    setClassToBoard() {
        for (let i in this.game.dataStore.initialGame) {
            const cell = document.getElementById(`index_${i}`);
            if (this.game.dataStore.initialGame[+i] === 0) {
                cell.classList.add('cell-value');
                continue;
            }
            cell.classList.remove('cell-value');
        }
    }

    onNumpadNumberSelected(digit) {
        if (!digit) {
            if (this.selectedBoardIndex >= 0) {
                this.game.erase();
                this.boardView.cellUpdate(this.selectedBoardIndex, '');
            }
            return;
        }
        if (this.game.canSetDigitInArray(digit, this.selectedBoardIndex, this.game.dataStore.tempGame)) {
            this.game.setDigit(digit);
            this.boardView.cellUpdate(this.selectedBoardIndex, digit)
            if (!this.game.canContinueGame(this.game.dataStore.tempGame)) {
                this.game.newGame(this.difficultyView.select.value)
                    .then(data => {
                        this.boardView.setData(data);
                        this.scoreView.update();
                    })
            }
        }
        }

    onBoardIndexSelected(index) {
        this.selectedBoardIndex = index;
        this.game.setIndex(index);
    }

    async onDifficultySelected(difficulty) {
        const data = await this.game.newGame(difficulty);
                this.boardView.setData(data);
                this.setClassToBoard();
                this.scoreView.update();
    }
}