import model from "../model.js";

class BoardView {
    constructor() {
    this.isExist = false;
    this.container = document.createElement('div');
    this.setData = this.setData.bind(this);
    }

    render() {
        if (!this.isExist) {
            this.create();
            this.isExist = true;
        } else {
            this.update();
        }
    }

    create() {
        const table = document.createElement('table');
        table.classList.add('sudokuBoard');
        this.tableBody = document.createElement('tbody');
        const len = Math.sqrt(this.userGrid.length);
        for (let i = 0; i < len; i++) {
            const row = document.createElement('tr');
            row.classList.add('game-row');
            for (let j = 0; j < len; j++) {
                const index =  i * 9 + j;
                const cell = document.createElement('td');
                cell.innerText = this.userGrid[index] > 0 ? this.userGrid[index] : '';
                row.appendChild(cell);
                cell.classList.add('game-cell');
                typeof this.userGrid[index] === 'string' ? cell.classList.add('cell-value') : null;
                cell.setAttribute('id', `index_${index}`);
                    cell.addEventListener('click', this.dispatchCellIndex);
            }
            this.tableBody.appendChild(row);
        }
        table.appendChild(this.tableBody);


        this.container.classList.add('tempReview');
        this.container.appendChild(table);
        document.getElementById('root').appendChild(this.container);
    }

    dispatchCellIndex(event) {
      model.dispatch('index',(Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement) * 9) + Array.from(event.target.parentElement.children).indexOf(event.target))
    }

    update() {
        const len = this.tableBody.children.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                const cell = this.tableBody.children[i].children[j];
                cell.innerText = this.userGrid[i * len + j] > 0 ? this.userGrid[i * len + j] : '';
                typeof this.userGrid[i * len + j] === 'string' ? cell.classList.add('cell-value') : cell.classList.remove('cell-value');
            }
        }
    }

     setData(userGrid) {
        this.userGrid = userGrid;
         this.render();
    }
}

export const board = new BoardView();