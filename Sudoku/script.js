import account from "./classes/GameView.js";
import {dataStore} from "./classes/DataStore.js";
import {game} from "./Game.js";

//todo: test branch

window.onload = main;

function main() {

     if (localStorage.ticket) {
          dataStore.getSavedGame()
              .then(data => {
                   account.notify('data' ,data);
                   account.notify('view', null);
              });
     }
}
