function randomNum() {
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

console.log(newArray);

const tmp = newArray[0];

function checkWinningRow(board) {
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    if (row.every(value => value === 'X') || row.every(value => value === 'O')) {
      console.log(`Row ${i + 1} is a winning row with all ${row[0]}'s.`);
    }
  }
}

// Example usage with your created 3D array
checkWinningRow(newArray);