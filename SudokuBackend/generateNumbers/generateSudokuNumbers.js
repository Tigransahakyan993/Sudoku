function startAlgorithm() {
    const sudokuNumbers = [];
    let counter = 0;
    let digit;

    for (let i = 0; i < 81; i++) {
        digit = Math.floor(Math.random() * 9 + 1);
        if(!isDigitInRow(digit, i, sudokuNumbers) && !isDigitInColumn(digit, i, sudokuNumbers) && !isDigitInMatrix(digit, i, sudokuNumbers)) {
            sudokuNumbers[i] = digit;
            counter = 0;
        } else {
            i--;
            counter++;
            if (counter === 40) {
                while ( i > 0 ) {
                    sudokuNumbers[i] = 0;
                    i--;
                }
                counter = 0;
            }
        }
    }
    return sudokuNumbers;
}

function isDigitInRow(digit, index, arr){
    const startPoint = (index - (index % 9));
    const endPoint = startPoint + 9;

    for(let i = startPoint; i < endPoint; i++) {
        if(digit === arr[i]) {
            return true;
        }
    }
    return false;
}

function isDigitInColumn(digit, index, arr) {
    for (let i = index % 9; i < 81; i+=9) {
        if(arr[i] === digit) {
            return true;
        }
    }
    return false;
}

function isDigitInMatrix(digit, index, arr) {
    let column = index % 9;
    let row = Math.floor(index / 9);
    let startIndex = ((row - (row % 3)) * 9) + (column - (column % 3));

    let matrixCellCount = 0;
    let matrixLoop = 0
    while(startIndex < arr.length && matrixLoop < 3){
        matrixCellCount++;
        if (arr[startIndex] === digit) {
            return true;
        }

        if (matrixCellCount === 3){
            matrixCellCount = 0;
            matrixLoop++;
            startIndex += 7;
            continue;
        }

        startIndex++;

    }
    return false;
}

module.exports = startAlgorithm;

