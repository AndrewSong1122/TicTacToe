var TicTacToe = function() {
    var ttt = {};
    ttt.turn = 1; // initial turn, starts with X
    ttt.occupied = 0;
    ttt.grid = [[0, 0 , 0], [0, 0, 0], [0, 0, 0]];

    // inserts X or O into grid when button is clicked
    ttt.insert = function(e) {
        if (e.target.innerHTML === 'X' || e.target.innerHTML === 'O') {
            return;
        }

        var coord = e.target.id.split(' ');
        var row = coord[0];
        var col = coord[1];

        var move = (ttt.turn % 2 === 1) ? 'X' : 'O';

        ttt.grid[row][col] = move;
        e.target.innerHTML = move;
        ttt.occupied++;
        ttt.turn++;

        if (ttt.checkWin(row, col, move)) {
            // do victory stuff
            ttt.disableButtons();
            document.getElementById('turnheader').innerHTML = 'Victory!';
            document.getElementById('playerheader').innerHTML = 'Player ' + move + ' wins!';
            move = (move === 'X') ? 'o' : 'x';
            document.getElementById('blah').innerHTML = 'grovel, player ' + move;
        } else if (ttt.occupied === 9) {
            // it draw :(
            ttt.disableButtons();
            document.getElementById('turnheader').innerHTML = 'It\'s a draw...';
            document.getElementById('playerheader').innerHTML = 'are y\'all even trying?';
            document.getElementById('blah').innerHTML = 'your mothers are very disappointed in you';
            document.getElementById('meh').innerHTML = 'everyone loses';
        } else {
            // update headers
            document.getElementById('turnheader').innerHTML = 'Turn ' + ttt.turn;
            move = (move === 'X') ? 'O' : 'X';
            document.getElementById('playerheader').innerHTML = 'Make your move, Player ' + move;
        }
    };
    ttt.checkWin = function(row, col, move) {
        if (ttt.checkDiags(row, col, move)) {
            return true;
        }
        var v = 0;
        var c = 0;
        for (var n = 0; n < 3; n++) {
            if (ttt.grid[n][col] === move) {
                v += 1;
            }
            if (ttt.grid[row][n] === move) {
                c += 1;
            }

            if (v === 3 || c === 3) {
                return true;
            }
        }

        return false;
    };
    ttt.checkDiags = function(row, col, move) {
        if ((row === 1 || col === 1) && !(row === 1 && col === 1)) {
            return false;
        }

        if (ttt.grid[0][0] === move && ttt.grid[1][1] === move && ttt.grid[2][2] === move) {
            return true;
        }

        if (ttt.grid[2][0] === move && ttt.grid[1][1] === move && ttt.grid[0][2] === move) {
            return true;
        }

        return false;
    };
    ttt.reset = function() {
        ttt.turn = 1;
        ttt.occupied = 0;
        ttt.grid = [[0, 0 , 0], [0, 0, 0], [0, 0, 0]];
        var gridButtons = document.getElementsByClassName('gridButton');
        for (var i = 0; i < gridButtons.length; i++) {
            gridButtons[i].disabled = false;
            gridButtons[i].innerHTML = '&nbsp';
        }
        document.getElementById('turnheader').innerHTML = 'Turn 1';
        document.getElementById('playerheader').innerHTML = 'Make your move, Player X';
        document.getElementById('blah').innerHTML = '';
        document.getElementById('meh').innerHTML = '';
    };
    ttt.disableButtons = function() {
        var gridButtons = document.getElementsByClassName('gridButton');
        for (var i = 0; i < gridButtons.length; i++) {
            gridButtons[i].disabled = true;
        }
    };

    return ttt;   
};

var gridButtons = document.getElementsByClassName('gridButton');
var game = TicTacToe();
document.getElementById('reset').onclick = game.reset;
for (var i = 0; i < gridButtons.length; i++) {
    gridButtons[i].onclick = game.insert;
    gridButtons[i].disabled = false;
}