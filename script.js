const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

const scoreXText = document.getElementById("score-x");
const scoreOText = document.getElementById("score-o");
const scoreDrawText = document.getElementById("score-draw");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

cells.forEach(function(cell) {
    cell.addEventListener("click", function() {
        const index = Number(cell.dataset.index);

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        checkWinner();
    });
});

function checkWinner() {
    let winningCombination = null;

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            winningCombination = pattern;
            break;
        }
    }

    if (winningCombination !== null) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;

        // Highlight winning cells
        winningCombination.forEach(index => {
            cells[index].classList.add("winning");
        });

        // Update score
        if (currentPlayer === "X") {
            scoreX++;
            scoreXText.textContent = scoreX;
        } else {
            scoreO++;
            scoreOText.textContent = scoreO;
        }
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        scoreDraw++;
        scoreDrawText.textContent = scoreDraw;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

restartButton.addEventListener("click", restartGame);

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";

    cells.forEach(function(cell) {
        cell.textContent = "";
        cell.classList.remove("x", "o", "winning");
    });
}