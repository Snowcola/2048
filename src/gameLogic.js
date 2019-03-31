import equal from "fast-deep-equal";
import Cell from "./cell";
import { clone } from "./utils";

export function addRandom(matrix, newGame = false, CHANCE_OF_FOUR = 0.08) {
  let empty_cells = [];
  const newGrid = matrix.map(row => row.map(col => col));
  newGrid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 0) {
        empty_cells.push([rowIndex, colIndex]);
      }
    });
  });
  if (empty_cells.length > 0) {
    const randomIndex = Math.floor(Math.random() * empty_cells.length);
    const new_val = Math.random() < CHANCE_OF_FOUR && !newGame ? 4 : 2;
    const [row, col] = empty_cells[randomIndex];
    newGrid[row][col] = new Cell({
      value: new_val,
      row: row,
      col: col,
      oldCol: col,
      oldRow: row
    });

    return newGrid;
  } else {
    console.log("grid full");
    return matrix;
  }
}

export function moveLeft(matrix, setMergedTiles, setScore) {
  let leftovers = [];
  const newGrid = matrix.map((row, rowIndex) => {
    let new_vals = row.filter(cell => cell !== 0);
    let x;
    [new_vals, x] = mergeLeft(new_vals, setScore);
    leftovers.push(x);
    while (new_vals.length < matrix.length) {
      new_vals.push(0);
    }
    return new_vals;
  });

  setMergedTiles(leftovers);

  if (!equal(valueArray(newGrid), valueArray(matrix))) {
    return addRandom(newGrid);
  } else {
    return newGrid;
  }
}

export function valueArray(arr) {
  return arr.map(row => row.map(cell => cell.value));
}

function mergeLeft(row, setScore) {
  let new_vals = [...row.map(x => clone(x))];
  let merged_vals = [];
  let leftOvers = [];
  let score = 0;
  for (let i = 0; i < row.length; ++i) {
    const test_cell = new_vals.shift();
    if (test_cell) {
      test_cell.merged = false;
      test_cell.newTile = false;
    }
    if (
      test_cell &&
      new_vals.length > 0 &&
      test_cell.value === new_vals[0].value
    ) {
      let cell2 = new_vals.shift();
      score += test_cell.value * 2;
      const merged_cell = new Cell({
        ...test_cell,
        value: score,
        merged: true,
        newTile: false
      });
      cell2.oldRow = cell2.row;
      cell2.oldCol = cell2.col;
      cell2.row = test_cell.row;
      cell2.col = test_cell.col;

      merged_cell.newTile = false;

      merged_vals.push(merged_cell);
      leftOvers.push(cell2);
    } else if (test_cell) {
      merged_vals.push(test_cell);
    }
  }
  setScore(score);

  return [[...merged_vals], leftOvers];
}
