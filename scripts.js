const gridContainer = document.querySelector(".gridContainer");
const result = document.querySelector(".result");
let gameOver = false;
const columns = 7;
const rows = 6;
const gameCells = 42;
const playerOne = 1;
const playerTwo = 2;
let move = 0;
let table = [];
const winningOptions = [
    // orizontal winningOptions
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
    [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
    [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
    [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
    [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
    [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
    // vertical winningOptions
    [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
    [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
    [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
    [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
    [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
    [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
    [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
    // mainDiagonal winningOptions
    [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27],
    [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34],
    [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41], 
    // secondDiagonal WinningOptions
    [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24],
    [10, 16, 22, 28], [11, 17, 23, 29], [12, 18, 24, 30], [13, 19 ,25, 31],
    [17, 23, 29, 35], [18, 24, 30, 36], [19, 25, 31, 37], [20, 26, 32, 38]
  ]

createGameGrid();

function createGameGrid() {
    for (let i = 0; i < rows ; ++i) {
        let row = [];
        for (let y = 0; y < columns; ++y) {
            let cells = document.createElement("div");
            gridContainer.appendChild(cells);
            cells.classList.add("cellsGrid");
            cells.id = `${i} ${y}`;
            cells.addEventListener("click", assignedColoredCircle);
            row.push("");
        }
        table.push(row);
    } 
}

function assignedColoredCircle() {  
    if(gameOver == false) {
        let clickedCellAddress = this.id.split(" ");
        let columnAddress = Number(clickedCellAddress[1]);
        let updateRowAddress = findAvailableCell(columnAddress);
        if (updateRowAddress === -1) {
            return;
        }
        let lastEmptyCellFromColumn = document.getElementById(`${updateRowAddress} ${columnAddress}`);
        if (move % 2 === 0) {
            lastEmptyCellFromColumn.style.backgroundColor = "red";
            table[updateRowAddress][columnAddress] = playerOne;
            ++move;
        } else {
            lastEmptyCellFromColumn.style.backgroundColor = "#4169E1";
            table[updateRowAddress][columnAddress] = playerTwo;
            ++move;
        }
        draw();
        checkWinner();
    }
}

function findAvailableCell(columnAddress) {
    for (let j = rows - 1; j >= 0; --j) {
        if (table[j][columnAddress] === "") {
            return j;
        }
    }
    return -1;
}

function draw() {
    if (move == gameCells) {
        result.innerHTML = "It's draw!"
    }
}

function checkWinner() {
    for (let y = 0; y < winningOptions.length; y++) {
        const circle1 = table[Math.floor(winningOptions[y][0] / columns)][winningOptions[y][0] % columns];
        const circle2 = table[Math.floor(winningOptions[y][1] / columns)][winningOptions[y][1] % columns];
        const circle3 = table[Math.floor(winningOptions[y][2] / columns)][winningOptions[y][2] % columns];
        const circle4 = table[Math.floor(winningOptions[y][3] / columns)][winningOptions[y][3] % columns];
        if (circle1 === playerOne && circle2 === playerOne && circle3 === playerOne && circle4 === playerOne) {
            result.innerHTML = "Player 1 is the Winner!";
            gameOver = true;
            return;
        } else if (circle1 === playerTwo && circle2 === playerTwo && circle3 === playerTwo && circle4 === playerTwo){
            result.innerHTML = "Player 2 is the Winner!";
            gameOver = true;
            return;
        }
    }
}

function restartGame() {
    location.reload();
}