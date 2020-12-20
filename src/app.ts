const _ = require('lodash');

let arrBoard: Array<Array<number>> = [];
let shiftForLine = [0, 3, 3, 1, 3, 3, 1, 3, 3];

const initBoard = (): void => {
    for (let i = 0; i < 9; i++) {
        arrBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
}

const getDefaultNumbers = (): Array<number> => {
    let numbers: Array<number> = [];
    for (var i = 0; i < 9; i++) {
        numbers.push(i + 1);
    }
    return numbers;
}

const getRandomValue = (numbers: Array<number>): number => {
    let randomIndex: number = Math.floor(numbers.length * Math.random());
    var randomValue: number = numbers[randomIndex];
    return randomValue;
}

const generateSudoku = () => {
    let iter: number = 0;
    let curLine = Math.floor(Math.random() * 9) + 1;

    while(iter < 9) {
        if (iter === 0) {
            for (var j = 0; j < 9; j++) {
                let numbers: Array<number> = getDefaultNumbers();

                let tmpIter: number = j - 1;
                while (tmpIter >= 0) {
                    let numberToDelete: number = arrBoard[curLine - 1][tmpIter];
                    _.remove(numbers, function (value: number) { return value === numberToDelete; });
                    tmpIter--;
                }
                let randomValue = getRandomValue(numbers);
                arrBoard[curLine - 1][j] = randomValue;
            }
        } else {
            let prevIndexLine = curLine - 1;
            if(prevIndexLine === 0){
                prevIndexLine = 9;
            }
            let curShift = shiftForLine[iter];
            let startArr: Array<number> = arrBoard[prevIndexLine - 1].slice(curShift, arrBoard[prevIndexLine - 1].length);
            let endArr: Array<number> = arrBoard[prevIndexLine - 1].slice(0, curShift);
            let newArr: Array<number>  = startArr.concat(endArr);
            arrBoard[curLine - 1] = newArr;
            
        }

        iter++;
        curLine++;
        if(curLine > 9){
            curLine = 1;
        }
    }
}
const consolePrettyPrint = () => {
    arrBoard.forEach(rec=> {
        console.log(`${rec.slice(0,3).join('')} ${rec.slice(3,6).join('')} ${rec.slice(3,6).join('')}`);
    });
}

initBoard();
generateSudoku();
consolePrettyPrint();
