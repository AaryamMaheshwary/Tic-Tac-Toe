const images = [
    "url('img/circle.png')",
    "url('img/cross.png')"
];

var buttons = {
    "1": [document.getElementById('1'), -1],
    "2": [document.getElementById('2'), -1],
    "3": [document.getElementById('3'), -1],
    "4": [document.getElementById('4'), -1],
    "5": [document.getElementById('5'), -1],
    "6": [document.getElementById('6'), -1],
    "7": [document.getElementById('7'), -1],
    "8": [document.getElementById('8'), -1],
    "9": [document.getElementById('9'), -1],
};

var pastMoves = [];
var nextPlayer = 0;
function playerMove(location) {
    if (buttons[location][1] == -1) {
        buttons[location][0].style.backgroundImage = images[nextPlayer];
        buttons[location][1] = nextPlayer;
        if (checkForWinner(nextPlayer)) {
            checkForDraw();
        }
        pastMoves.push(location);
        flipNextPlayer();
    }
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function checkForWinner(color) {
    for (x = 0; x < 8; x++) {
        winningCondition = winningConditions[x];
        if (buttons[Object.keys(buttons)[winningCondition[0]]][1] == color &&
            buttons[Object.keys(buttons)[winningCondition[1]]][1] == color &&
            buttons[Object.keys(buttons)[winningCondition[2]]][1] == color) {
            winOrDrawFound(color);
            return false;
        }
    }
    return true;
}

function checkForDraw() {
    for (key in buttons) {
        if (buttons[key][1] == -1) {
            return;
        }
    }
    winOrDrawFound(2);
}

function flipNextPlayer() {
    if (nextPlayer == 0) {
        nextPlayer = 1;
    } else {
        nextPlayer = 0;
    }
}

var gameStatusLabel = document.getElementById('gameStatusLabel');
function winOrDrawFound(winOrDraw) {
    for (key in buttons) {
        if (buttons[key][1] == -1) {
            buttons[key][1] = 3;
        }
    }
    if (winOrDraw == 0) {
        gameStatusLabel.innerHTML = 'Circle Won!';
        gameStatusLabel.style.color = 'red';
    } else if (winOrDraw == 1) {
        gameStatusLabel.innerHTML = 'Cross Won!';
        gameStatusLabel.style.color = 'blue';
    } else {
        gameStatusLabel.innerHTML = 'It was a Draw.';
        gameStatusLabel.style.color = 'black';
    }
}

function undoMove() {
    if (pastMoves.length != 0) {
        buttons[pastMoves[pastMoves.length - 1]][0].style.backgroundImage = 'none';
        buttons[pastMoves[pastMoves.length - 1]][1] = -1;
        gameStatusLabel.innerHTML = '';
        for (key in buttons) {
            if (buttons[key][1] == 3) {
                buttons[key][1] = -1;
            }
        }
        flipNextPlayer();
        pastMoves.splice(-1, 1);
    }
}

function resetGame() {
    for (key in buttons) {
        buttons[key][0].style.backgroundImage = 'none';
        buttons[key][1] = -1;
    }
    gameStatusLabel.innerHTML = '';
    pastMoves = [];
    nextPlayer = 0;
}