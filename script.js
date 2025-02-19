//your JS code here. If required.
        let currentPlayer = 'X';
        let players = {};
        let board = Array(9).fill(null);

        document.getElementById('submit').addEventListener('click', function() {
            let player1 = document.getElementById('player-1').value;
            let player2 = document.getElementById('player-2').value;
            
            if (!player1 || !player2) {
                alert("Please enter both player names");
                return;
            }
            
            players = { 'X': player1, 'O': player2 };
            document.getElementById('player-input').style.display = 'none';
            document.querySelector('h1').style.display = 'block';
            document.querySelector('.board').style.display = 'grid';
            document.querySelector('.message').textContent = `${players[currentPlayer]}, you're up!`;

            createBoard();
        });

        function createBoard() {
            let boardDiv = document.getElementById('board');
            boardDiv.innerHTML = '';
            board.forEach((_, index) => {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = index;
                cell.addEventListener('click', handleMove, { once: true });
                boardDiv.appendChild(cell);
            });
        }

        function handleMove(event) {
            let id = event.target.id;
            board[id] = currentPlayer;
            event.target.textContent = currentPlayer;
            
            if (checkWin()) {
                document.querySelector('.message').textContent = `${players[currentPlayer]} congratulations you won!`;
                return;
            }
            
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.querySelector('.message').textContent = `${players[currentPlayer]}, you're up!`;
        }

        function checkWin() {
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winningCombos.some(combo => {
                return combo.every(index => board[index] === currentPlayer);
            });
        }
    