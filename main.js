document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.container div');
    const result = document.querySelector('#result');
    const displayCurrentPlayer = document.querySelector('#current-player');
    const restartBtn = document.getElementById('restart-btn');
    let currentPlayer = 1;
    let gameActive = true;

    const winningArrays = [
        // Horizontal wins
        [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
        [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
        [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
        [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
        [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
        [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
        // Vertical wins
        [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
        [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
        [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
        [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
        [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
        [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
        [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
        // Diagonal wins (↘)
        [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27],
        [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34],
        [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41],
        // Diagonal wins (↙)
        [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24],
        [10, 16, 22, 28], [11, 17, 23, 29], [12, 18, 24, 30], [13, 19, 25, 31],
        [17, 23, 29, 35], [18, 24, 30, 36], [19, 25, 31, 37], [20, 26, 32, 38]
    ];

    function checkForWin() {
        for (let y = 0; y < winningArrays.length; y++) {
            const [a, b, c, d] = winningArrays[y];
            const s1 = squares[a];
            const s2 = squares[b];
            const s3 = squares[c];
            const s4 = squares[d];

            if (
                s1.classList.contains('player-one') &&
                s2.classList.contains('player-one') &&
                s3.classList.contains('player-one') &&
                s4.classList.contains('player-one')
            ) {
                result.innerHTML = 'Player 1 wins!';
                gameActive = false;
                return;
            }

            if (
                s1.classList.contains('player-two') &&
                s2.classList.contains('player-two') &&
                s3.classList.contains('player-two') &&
                s4.classList.contains('player-two')
            ) {
                result.innerHTML = 'Player 2 wins!';
                gameActive = false;
                return;
            }
        }
    }

    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', () => {
            if (!gameActive) return;
            if (
                squares[i + 7] &&
                squares[i + 7].classList.contains('taken') &&
                !squares[i].classList.contains('taken')
            ) {
                if (currentPlayer === 1) {
                    squares[i].classList.add('taken', 'player-one');
                    currentPlayer = 2;
                    displayCurrentPlayer.innerHTML = currentPlayer;
                } else {
                    squares[i].classList.add('taken', 'player-two');
                    currentPlayer = 1;
                    displayCurrentPlayer.innerHTML = currentPlayer;
                }
                checkForWin();
            } else {
                if (gameActive) alert("Can't go here");
            }
        });
    }

    restartBtn.addEventListener('click', () => {
        squares.forEach(square => {
            if (!square.classList.contains('invisible')) {
                square.classList.remove('player-one', 'player-two', 'taken');
            } else {
                square.classList.add('taken');
            }
        });
        result.innerHTML = '';
        currentPlayer = 1;
        displayCurrentPlayer.innerHTML = currentPlayer;
        gameActive = true;
    });
});
