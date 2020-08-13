import {service} from "../service/service.js";


  export const getUserGrid = async (difficulty = 'easy') => {
      return await service(`getUserGrid/${JSON.parse(localStorage.ticket).userId}/${difficulty}`, 'GET', null);
   };
  export const getSavedGame = async () => {
      return await service(`getSavedGame/${JSON.parse(localStorage.ticket).userId}`)
   };
  export const gtePuzzleDigit = async (index) => {
      return await service(`getPuzzleDigit/${JSON.parse(localStorage.ticket).userId}/${index}`);
   };
  export const saveUserGrid = async (game) => {
        await service('saveGame', 'PUT', {game, id: JSON.parse(localStorage.ticket).userId})
   };

