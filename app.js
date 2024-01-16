const TicTacToeGame = () => {
  const cell = document.querySelectorAll('.cell');
  const restartContainer = document.querySelector('.restart-container');
  const playerX = "X";
  const playerO = "O";
  let currentPlayer = playerX;
  let result;
  let gameBoard = [null, null, null, null, null, null, null, null, null];
  let gameOver = false;
  let winStatus = document.querySelector('.win');

  const createImageElement = (player) => {
    const img = document.createElement('img');
    img.src = player === 'X' ? 'image/X.png' : 'image/O.png';
    return img;
  };

  const computerIndex = (board) => {
    const vacantIndices = [];
    board.forEach((value, index) => {
      if (value === null) {
        vacantIndices.push(index);
      }
    });

    if (vacantIndices.length > 0) {
      const randomIndex = vacantIndices[Math.floor(Math.random() * vacantIndices.length)];
      board[randomIndex] = 'O';
      return [board[randomIndex], randomIndex];
    }
  };

  const handlePlayerMove = (cell, index) => {
    if (!gameOver && gameBoard[index] === null) {
      const playerMoveImage = createImageElement(currentPlayer);
      cell.append(playerMoveImage);
      gameBoard[index] = currentPlayer;
      console.log(gameBoard);
      checkGame();
      setTimeout(() => handleComputerMove(), 500);
    }
  };

  const handleComputerMove = () => {
    if (!gameOver) {
      let computerPlay = computerIndex(gameBoard);
      if (computerPlay) {
        const computerMoveImage = createImageElement(playerO);
        cell[computerPlay[1]].append(computerMoveImage);
        checkGame();
      }
    }
  };
  

  const checkGame = () => {
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winningConditions.length; i++) {
      let [a, b, c] = winningConditions[i];
      if (gameBoard[a] === 'X' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        result = `Player ${currentPlayer} Wins`;
        winStatus.textContent = result;
        setTimeout(() => restartContainer.style.display = "block", 1000);
        gameOver = true;
        console.log(result);
        return;
      }

      if (gameBoard[a] === 'O' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        result = `Player O Wins`;
        winStatus.textContent = 'Computer Win';
        setTimeout(() => restartContainer.style.display = "block", 1000);
        gameOver = true;
        console.log(result);
        return;
      }
    }

    if (!gameBoard.includes(null)) {
      result = 'It\'s a draw!';
      winStatus.textContent = result;
      setTimeout(() => restartContainer.style.display = "block", 1000);
      console.log(result);
      gameOver = true;
    }
  };

  const restartGame = () => {
    let score = 0;
    gameBoard = [null, null, null, null, null, null, null, null, null];
    currentPlayer = 'X';
    result = '';
    cell.forEach((value) => {
      value.textContent = "";
    });
    restartContainer.style.display = "none";
    renderBoard();
    gameOver = false;
  };

  const renderBoard = () => {
    cell.forEach((value, index) => {
      value.addEventListener('click', () => handlePlayerMove(value, index));
    });
  };

  return {
    renderBoard,
    restartGame
  };
};

// Usage
const gameInstance = TicTacToeGame();
gameInstance.renderBoard();
