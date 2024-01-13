/* function randomNum() {
  let a = Math.floor(Math.random() * 10);
  if (a < 5) {
    return "X";
  }
  else {
    return "O";
  }
}

const arrays = [];
for (let i = 0; i < 9; i++) {
  arrays.push(randomNum());
}

const newArray = [];
for (let i = 0; i < 3; i++) {
  const row = [];
  for (let j = 0; j < 3; j++) {
    row.push(arrays[i * 3 + j]);
  }
  newArray.push(row);
}
console.log(newArray); */

































const cell = document.querySelectorAll('.cell');

for (let i = 0; i < cell.length; i++) {
  cell[i].addEventListener('click', () => {
    cell[i].textContent = 'X';
  })
}





const newArray = [['X', 'O', 'X'],
                  ['X', 'O', 'X'],
                  ['X', 'O', 'X']]


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




console.log(leftToRightTop(newArray));
console.log(leftToRightMiddle(newArray));
console.log(leftToRightBottom(newArray));

console.log(topDownLeft(newArray));
console.log(topDownMiddle(newArray));
console.log(topDownRight(newArray));

console.log(diagonalChecks(newArray));
/* runGame() */