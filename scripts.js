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
let cellI;
let cellJ;

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
    if(gameOver === false) {
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
        if (move >= 7) {
            isWinner();
        }
        if (move === gameCells) {
            isDraw();
        }
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

function isWinner() {
    for (cellI = 0; cellI < rows; ++cellI) {
        for (cellJ = 0; cellJ < columns; ++cellJ) {
            checkWinnerHorizontal();
            checkWinnerVertical();
            checkWinnerMainDiagonal();
            checkWinnerSecondDiagonal();
        }
    }
}

function checkWinnerHorizontal() {
    if(cellJ <= columns - 4 && table[cellI][cellJ] !== "") {
        if (table[cellI][cellJ] === table[cellI][cellJ + 1] && 
            table[cellI][cellJ] === table[cellI][cellJ + 2] &&
            table[cellI][cellJ] === table[cellI][cellJ + 3]) {
            result.innerHTML = `Player ${table[cellI][cellJ]} is the Winner!`;
            gameOver = true;
            return;
        }
    }
}

function checkWinnerVertical() {
    if(cellI >= 3 && table[cellI][cellJ] !== "") {
        if (table[cellI][cellJ] === table[cellI - 1][cellJ] && 
            table[cellI][cellJ] === table[cellI - 2][cellJ] && 
            table[cellI][cellJ] === table[cellI - 3][cellJ]) {
            result.innerHTML = `Player ${table[cellI][cellJ]} is the Winner!`;
            gameOver = true;
            return;
        }
    }
}

function checkWinnerMainDiagonal() {
    if (cellI >= 3 && cellJ >= 3 && table[cellI][cellJ] !== "") {
        if (table[cellI][cellJ] === table[cellI - 1][cellJ - 1] &&
            table[cellI][cellJ] === table[cellI - 2][cellJ - 2] &&
            table[cellI][cellJ] === table[cellI - 3][cellJ - 3]) {
            result.innerHTML = `Player ${table[cellI][cellJ]} is the Winner!`;
            gameOver = true;
            return;
        }
    }
}

function checkWinnerSecondDiagonal() {
    if (cellI >= 3 && cellJ <= columns - 4 && table[cellI][cellJ] !== "") {
        if (table[cellI][cellJ] === table[cellI - 1][cellJ + 1] &&
            table[cellI][cellJ] === table[cellI - 2][cellJ + 2] &&
            table[cellI][cellJ] === table[cellI - 3][cellJ + 3]) {
            result.innerHTML = `Player ${table[cellI][cellJ]} is the Winner!`;
            gameOver = true;
            return;
        }
    }
}

function isDraw() {
    result.innerHTML = "It's draw!"
}

function restartGame() {
    location.reload();
}
