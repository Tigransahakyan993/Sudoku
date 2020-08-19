function getGrids(puzzleGrid, level = 'easy') {
    let userGrid;
    switch (level) {
        case 'easy':
            userGrid = resetNumbers(puzzleGrid, 30);
            break;
        case 'medium':
            userGrid = resetNumbers(puzzleGrid, 40);
            break;
        case 'hard':
            userGrid = resetNumbers(puzzleGrid, 50);
            break;
    }

    return userGrid
}

function resetNumbers(arr, percent) {
    percent = arr.length * percent / 100;
    const temp = [...arr];

    for (let i = 0; i < percent; i++) {
        const randomIndex = Math.floor(Math.random() * 81);
        if (temp[randomIndex] > 0) {
            temp[randomIndex] = 0;
        } else {
            i--;
        }
    }
    return temp;
}

module.exports =  getGrids;