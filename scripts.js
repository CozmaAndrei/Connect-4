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

function isWinner() {
    if(move >= 7) {
        checkWinnerOrizontal();
        checkWinnerVertical();
        checkWinnerMainDiagonal();
        checkWinnerSecondDiagonal();
    }
}

function isDraw() {
    if (move === gameCells) {
        result.innerHTML = "It's draw!"
    }
}

function checkWinnerOrizontal() {
    for (let i = 5; i >= 0; --i) {
        for (let j = 0; j < 4; ++j) {
            if (table[i][j] === playerOne && 
                table[i][j + 1] === playerOne && 
                table[i][j + 2] === playerOne && 
                table[i][j + 3] === playerOne) {
                result.innerHTML = "Player 1 is the Winner!";
                gameOver = true;
                return;
            } else if (table[i][j] === playerTwo && 
                table[i][j + 1] === playerTwo && 
                table[i][j + 2] === playerTwo && 
                table[i][j + 3] === playerTwo) {
                result.innerHTML = "Player 2 is the Winner!";
                gameOver = true;
                return;
            }
        } 
    }
}

function checkWinnerVertical() {
    for (let j = 0; j <= 6; ++j) {
        for (let i = 5; i > 1; --i) {
            if (table[i][j] === playerOne && 
                table[i - 1][j] === playerOne && 
                table[i - 2][j] === playerOne && 
                table[i - 3][j] === playerOne) {
                result.innerHTML = "Player 1 is the Winner!";
                gameOver = true;
                return;
            } else if (table[i][j] === playerTwo && 
                table[i - 1][j] === playerTwo && 
                table[i - 2][j] === playerTwo && 
                table[i - 3][j] === playerTwo) {
                result.innerHTML = "Player 2 is the Winner!";
                gameOver = true;
                return;
            }
        }
    }
}

function checkWinnerMainDiagonal() {
    for (let i = 5; i >= 3; --i) {
        for (let j = 6; j >= 3; --j) {
            if (table[i][j] === playerOne &&
                table[i - 1][j - 1] === playerOne &&
                table[i - 2][j - 2] === playerOne &&
                table[i - 3][j - 3] === playerOne) {
                result.innerHTML = "Player 1 is the Winner!";
                gameOver = true;
                return; 
            } else if (table[i][j] === playerTwo &&
                table[i - 1][j - 1] === playerTwo &&
                table[i - 2][j - 2] === playerTwo &&
                table[i - 3][j - 3] === playerTwo) {
                result.innerHTML = "Player 2 is the Winner!";
                gameOver = true;
                return;
            }
        }
    }
}

function checkWinnerSecondDiagonal() {
    for (let i = 5; i >= 3; --i) {
        for (let j = 0; j <= 3; ++j) {
            if (table[i][j] === playerOne &&
                table[i - 1][j + 1] === playerOne &&
                table[i - 2][j + 2] === playerOne &&
                table[i - 3][j + 3] === playerOne) {
                result.innerHTML = "Player 1 is the Winner!";
                gameOver = true;
                return;
            } else if (table[i][j] === playerTwo &&
                table[i - 1][j + 1] === playerTwo &&
                table[i - 2][j + 2] === playerTwo &&
                table[i - 3][j + 3] === playerTwo) {
                result.innerHTML = "Player 2 is the Winner!";
                gameOver = true;
                return;
            }
        }
    }
}

function restartGame() {
    location.reload();
}
