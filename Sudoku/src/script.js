import {GameView} from "./view/GameView.js";
import {dataStore} from "./models/DataStore.js";
import {DATA_TYPE, VIEW_TYPE} from "./core/constants/CONSTANTS.js";

//todo: test branch

window.onload = main;

function main() {
    const game = new GameView();

    game.addObserver(DATA_TYPE, game.boardView.setData);
    game.addObserver(VIEW_TYPE, game.numpad.render);
    game.addObserver(VIEW_TYPE, game.scoreView.render);
    game.addObserver(VIEW_TYPE, game.difficultyView.render);

     if (localStorage.ticket) {
          dataStore.getCurrentSavedGame()
              .then(data => {
                  console.log(data);
                  game.notify(DATA_TYPE ,data);
                   game.notify(VIEW_TYPE, null);
              });
     }
}
