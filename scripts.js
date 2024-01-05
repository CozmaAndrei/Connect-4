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
        isDraw();
        isWinner();
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

function isDraw() {
    if (move === gameCells) {
        result.innerHTML = "It's draw!"
    }
}

function isWinner() {
    if (move >= 7) {
        for (cellI = 0; cellI < rows; ++cellI) {
            for (cellJ = 0; cellJ < columns; ++cellJ) {
            checkWinnerHorizontal();
            checkWinnerVertical();
            checkWinnerMainDiagonal();
            checkWinnerSecondDiagonal();
            }
        }
        displayResult();
    }
}

function checkWinnerHorizontal() {
    if(cellJ <= columns - 4) {
        if (table[cellI][cellJ] === playerOne && 
            table[cellI][cellJ + 1] === playerOne && 
            table[cellI][cellJ + 2] === playerOne && 
            table[cellI][cellJ + 3] === playerOne) {
            result.innerHTML = "Player 1 is the Winner!";
        } else if (table[cellI][cellJ] === playerTwo && 
            table[cellI][cellJ + 1] === playerTwo && 
            table[cellI][cellJ + 2] === playerTwo && 
            table[cellI][cellJ + 3] === playerTwo) {
            result.innerHTML = "Player 2 is the Winner!";
        }
    }
}

function checkWinnerVertical() {
    if(cellI >= 3) {
        if (table[cellI][cellJ] === playerOne && 
            table[cellI - 1][cellJ] === playerOne && 
            table[cellI - 2][cellJ] === playerOne && 
            table[cellI - 3][cellJ] === playerOne) {
            result.innerHTML = "Player 1 is the Winner!";
        } else if (table[cellI][cellJ] === playerTwo && 
            table[cellI - 1][cellJ] === playerTwo && 
            table[cellI - 2][cellJ] === playerTwo && 
            table[cellI - 3][cellJ] === playerTwo) {
            result.innerHTML = "Player 2 is the Winner!";
        }
    }
}

function checkWinnerMainDiagonal() {
    if (cellI >= 3 && cellJ >= 3) {
        if (table[cellI][cellJ] === playerOne &&
            table[cellI - 1][cellJ - 1] === playerOne &&
            table[cellI - 2][cellJ - 2] === playerOne &&
            table[cellI - 3][cellJ - 3] === playerOne) {
            result.innerHTML = "Player 1 is the Winner!";
        } else if (table[cellI][cellJ] === playerTwo &&
            table[cellI - 1][cellJ - 1] === playerTwo &&
            table[cellI - 2][cellJ - 2] === playerTwo &&
            table[cellI - 3][cellJ - 3] === playerTwo) {
            result.innerHTML = "Player 2 is the Winner!";
        }
    }
}

function checkWinnerSecondDiagonal() {
    if (cellI >= 3 && cellJ <= columns - 4) {
        if (table[cellI][cellJ] === playerOne &&
            table[cellI - 1][cellJ + 1] === playerOne &&
            table[cellI - 2][cellJ + 2] === playerOne &&
            table[cellI - 3][cellJ + 3] === playerOne) {
            result.innerHTML = "Player 1 is the Winner!";
        } else if (table[cellI][cellJ] === playerTwo &&
            table[cellI - 1][cellJ + 1] === playerTwo &&
            table[cellI - 2][cellJ + 2] === playerTwo &&
            table[cellI - 3][cellJ + 3] === playerTwo) {
            result.innerHTML = "Player 2 is the Winner!";
        }
    }
}

function displayResult() {
    if(result.innerHTML !== "") {
        gameOver = true; 
    }
    return;
}

function restartGame() {
    location.reload();
}
