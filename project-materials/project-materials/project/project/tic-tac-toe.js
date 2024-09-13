/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputting their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// Importing user input library
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// Function to update the game board with the user input
function markBoard(position, mark) {
    board[position] = mark;
}

// Function to print the game board as described
function printBoard() {
    console.log(`${board[1]} | ${board[2]} | ${board[3]}`);
    console.log('---------');
    console.log(`${board[4]} | ${board[5]} | ${board[6]}`);
    console.log('---------');
    console.log(`${board[7]} | ${board[8]} | ${board[9]}`);
}

// Function to validate user input
function validateMove(position) {
    const pos = parseInt(position);
    return !isNaN(pos) && pos >= 1 && pos <= 9 && board[pos] === ' ';
}

// List of winning combinations
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

// Function to check if the current player has won
function checkWin(player) {
    return winCombinations.some(combination => 
        combination.every(index => board[index] === player)
    );
}

// Function to check if the game board is full
function checkFull() {
    return Object.values(board).every(value => value !== ' ');
}

// The main part of the program (handling the game play)
function playTurn(player) {
    printBoard();
    let validMove = false;
    let position;

    while (!validMove) {
        position = prompt(`Player ${player}, enter your move (1-9): `);
        if (validateMove(position)) {
            validMove = true;
        } else {
            console.log("Invalid move, try again.");
        }
    }

    markBoard(position, player);

    if (checkWin(player)) {
        printBoard();
        console.log(`Player ${player} wins!`);
        return true;
    } else if (checkFull()) {
        printBoard();
        console.log("It's a tie!");
        return true;
    }
    return false;
}

// Function to restart the game
function restartGame() {
    board = {
        1: ' ', 2: ' ', 3: ' ',
        4: ' ', 5: ' ', 6: ' ',
        7: ' ', 8: ' ', 9: ' '
    };
    console.log('Game restarted: \n\n' +
        ' 1 | 2 | 3 \n' +
        ' --------- \n' +
        ' 4 | 5 | 6 \n' +
        ' --------- \n' +
        ' 7 | 8 | 9 \n');
}

// Entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false;
let currentTurnPlayer = 'X';

while (true) {
    winnerIdentified = playTurn(currentTurnPlayer);
    if (winnerIdentified) {
        let restart = prompt("Do you want to play again? (yes (Y)/no (N)): ").toLowerCase();
        if (restart === 'yes' || restart === 'y') {
            restartGame();
            winnerIdentified = false;
            currentTurnPlayer = 'X';
        } else {
            console.log("Thank you for playing!");
            break;
        }
    } else {
        currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';
    }
}
