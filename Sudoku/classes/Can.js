class Can {

    setDigitInRow(digit, index, arr){
        const startPoint = (index - (index % 9));
        const endPoint = startPoint + 9;

        for(let i = startPoint; i < endPoint; i++) {
            if(digit === +arr[i]) {
                return false;
            }
        }
        return true;
    }

    setDigitInColumn(digit, index, arr) {
        for (let i = index % 9; i < 81; i+=9) {
            if(+arr[i] === digit) {
                return false;
            }
        }
        return true;
    }

    setDigitInMatrix(digit, index, arr) {
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

    setDigitInArray(digit, index, arr) {
        return this.setDigitInColumn(digit, index, arr) && this.setDigitInRow(digit, index, arr) && this.setDigitInMatrix(digit, index, arr);
    }

    continueGame(arr) {
        for(let el of arr) {
            if (el === '0') {
                return true;
            }
        }
        return false;
    }

}

export const can = new Can();