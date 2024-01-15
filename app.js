const cell = document.querySelectorAll('.cell');
let array = [null, null, null, null, null, null, null, null, null];
const playerChoice = ["X", "O"];
let gameOver = false;


function createImageElement(notify) {
  if (notify === 'X') {
    const X = document.createElement('img');
    X.src = "image/X.png";
    return X;
  } else if (notify === 'O') {
    const O = document.createElement('img');
    O.src = "image/O.png";
    return O;
  }
}

function splitArray(array) {
  const result = [];
  for (let i = 0; i < array.length; i += 3) {
    result.push(array.slice(i, i + 3));
  }
  return result;
}

function computerIndex(board) {
  const vacantIndices = [];
  board.forEach((value, index) => {
    if (value === null) {
      vacantIndices.push(index);
    }
  });

  // If there are vacant indices, randomly select one and place 'O'
  if (vacantIndices.length > 0) {
    const randomIndex = vacantIndices[Math.floor(Math.random() * vacantIndices.length)];
    board[randomIndex] = 'O';
    return [board[randomIndex], randomIndex];
  }
}

function handlePlayerMove(index) {
  if (!gameOver && array[index] === null) {
    const playerMoveImage = createImageElement('X');
    cell[index].append(playerMoveImage);
    array[index] = 'X';
    console.log(array);
    handleComputerMove();
    checkGame();
  }

}

// Function to handle computer's move
function handleComputerMove() {
  if (!gameOver) {
    let computerPlay = computerIndex(array);
    if (computerPlay) {
      const computerMoveImage = createImageElement('O');
      cell[computerPlay[1]].append(computerMoveImage);
    }
  }
}

// Function to check the game status
function checkGame() {
  let newArray = splitArray(array);

  const checks = {
    leftToRightTop: leftToRightTop(newArray),
    leftToRightMiddle: leftToRightMiddle(newArray),
    leftToRightBottom: leftToRightBottom(newArray),
    topDownLeft: topDownLeft(newArray),
    topDownMiddle: topDownMiddle(newArray),
    topDownRight: topDownRight(newArray),
    diagonalChecks: diagonalChecks(newArray),
  };

  for (const check in checks) {
    const result = checks[check];
    if (result[0] === true) {
      gameOver = true;
      console.log(result[1]);
      alert(result);
      restartGame();
      break;  // Exit the loop if a winner is found
    }
  }

  if (!gameOver && array.every(cell => cell !== null)) {
    alert("It's a draw!");
    restartGame();
  }
}

function restartGame() {
  // Reset array to null
  array = [null, null, null, null, null, null, null, null, null];

  // Remove images from cells
  cell.forEach(cellElement => {
    while (cellElement.firstChild) {
      cellElement.removeChild(cellElement.firstChild);
    }
  });

  // Reset game state
  gameOver = false;
}

// Event listeners for each cell
for (let i = 0; i < cell.length; i++) {
  cell[i].addEventListener('click', () => {
    handlePlayerMove(i);
  });
}



function leftToRightCheck(board, rowIndex) {
  let countX = 0;
  let countO = 0;

  for (let i = 0; i < 3; i++) {
    if (board[rowIndex][i] === 'X') {
      countX++;
    } else if (board[rowIndex][i] === 'O') {
      countO++;
    }
  }

  if (countX === 3) {
    return [true, "X Wins"];
  } else if (countO === 3) {
    return [true, "O Wins"];
  }

  return [false, 'No Winner'];
}

function leftToRightTop(board) {
  return leftToRightCheck(board, 0);

}
function leftToRightMiddle(board) {
  return leftToRightCheck(board, 1);
}

function leftToRightBottom(board) {
  return leftToRightCheck(board, 2);
}


function topDownCheck(board, columnIndex) {
  let countingX = 0;
  let countingO = 0;

  for (let i = 0; i < 3; i++) {
    if (board[i][columnIndex] === 'X') {
      countingX++;
    } else if (board[i][columnIndex] === 'O') {
      countingO++;
    }
  }

  if (countingX === 3) {
    return [true, 'X Wins'];
  } else if (countingO === 3) {
    return [true, 'O Wins'];
  }

  return [false, 'No Winner'];
}

function topDownLeft(board) {
  return topDownCheck(board, 0);
}

function topDownMiddle(board) {
  return topDownCheck(board, 1);
}

function topDownRight(board) {
  return topDownCheck(board, 2);
}

function diagonalChecks(board) {
  let countX = 0;
  let countO = 0;

  // Main diagonal check
  for (let i = 0; i < 3; i++) {
    if (board[i][i] === 'X') {
      countX++;
    } else if (board[i][i] === 'O') {
      countO++;
    }
  }

  if (countX === 3) {
    return [true, "X Wins"];
  } else if (countO === 3) {
    return [true, "O Wins"];
  }

  countX = 0;
  countO = 0;

  for (let i = 0; i < 3; i++) {
    if (board[i][2 - i] === 'X') {
      countX++;
    } else if (board[i][2 - i] === 'O') {
      countO++;
    }
  }

  if (countX === 3) {
    return [true, "X Wins"];
  } else if (countO === 3) {
    return [true, "O Wins"];
  }

  return [false, 'No Winner'];
}


/* for (let i = 0; i < cell.length; i++) {
  cell[i].addEventListener('click', () => {
    if (array[i] === null) {
      cell[i].textContent = 'X';
      array[i] = "X";
      console.log(array);
      let computerPlay = computerTurn(array);
      if (computerPlay) {
        cell[computerPlay[1]].textContent = 'O';
      }
    }
   let newArray = splitArray(array);

   const checks = {
    leftToRightTop: leftToRightTop(newArray),
    leftToRightMiddle: leftToRightMiddle(newArray),
    leftToRightBottom: leftToRightBottom(newArray),
    topDownLeft: topDownLeft(newArray),
    topDownMiddle: topDownMiddle(newArray),
    topDownRight: topDownRight(newArray),
    diagonalChecks: diagonalChecks(newArray),
  };
  for (const check in checks) {
    const result = checks[check];
    if (result !== 'No Winner') {
      console.log(result);
      break;  // Exit the loop if a winner is found
    }
  }
  })
}
 */
