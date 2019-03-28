import React, { useState, useEffect } from 'react';
import equal from 'fast-deep-equal';
import Mousetrap from 'mousetrap';
import './App.css';
//const initial_state = [[2, 2, 2, 2], [0, 2, 6, 0], [4, 4, 7, 0], [0, 4, 8, 0]];
const initial_state = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const CHANCE_OF_FOUR = 0.08;

export default function Game() {
  const [grid, setGrid] = useState(addRandom(initial_state, true));
  const [old, setOld] = useState([]);
  const size = 4;
  const tileSize = 50;

  useEffect(() => {
    Mousetrap.bind(['left', 'a'], () => moveDirection(0));
    Mousetrap.bind(['up', 'w'], () => moveDirection(1));
    Mousetrap.bind(['right', 'd'], () => moveDirection(2));
    Mousetrap.bind(['down', 's'], () => moveDirection(3));
  });

  function addRandom(matrix, newGame = false) {
    let empty_cells = [];
    const newGrid = matrix.map((row) => row.map((col) => col));
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
      newGrid[row][col] = new_val;
      //setGrid(newGrid);
      return newGrid;
    } else {
      console.log('grid full');
      return matrix;
    }
  }

  function moveDirection(dirNum) {
    let matrix = clone(grid);
    for (let i = 0; i < dirNum; i++) {
      matrix = rotate(matrix, true);
      console.log('r', matrix);
    }
    matrix = moveLeft(matrix);
    console.log('moved', matrix);
    for (let i = 0; i < dirNum; i++) {
      matrix = rotate(matrix, false);
      console.log('r', matrix);
    }
    setGrid(matrix);
  }

  function moveLeft(matrix) {
    setOld(matrix.map((row) => row.map((col) => col)));
    const newGrid = matrix.map((x) => {
      let new_vals = x.filter((x) => x !== 0);

      new_vals = mergeLeft(new_vals);

      while (new_vals.length < size) {
        new_vals.push(0);
      }
      return new_vals;
    });

    if (!equal(newGrid, matrix)) {
      //add random
      console.log('map change add random');
      //setGrid(addRandom(newGrid));
      return addRandom(newGrid);
    } else {
      console.log('no map change');
      ///setGrid(newGrid);
      return newGrid;
    }
  }

  function moveLefttest() {
    setGrid(moveLeft(grid));
  }

  function showArray(arr) {
    return (
      <ul style={{ listStyle: 'none' }}>
        {arr.map((item, i) => (
          <li key={i}> {JSON.stringify(item)}</li>
        ))}
      </ul>
    );
  }
  const tilepadding = 5;
  const cellText = (cellValue) => {
    console.log(cellValue === 0 ? ' ' : cellValue);
    return cellValue === 0 ? ' ' : cellValue;
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Grid Test</h1>

        {/* board */}
        <div className="container">
          <div
            className="board"
            style={{
              position: 'relative',
              width: tileSize * size + tilepadding * 2,
              height: tileSize * size + tilepadding * 2,
              //backgroundColor: 'silver',
            }}
          >
            {/*tiles*/}
            {grid.map((row, r) =>
              row.map((cell, c) => {
                return (
                  <div
                    key={r + c + Date.now()}
                    className="tile"
                    style={{
                      top: r * tileSize,
                      left: c * tileSize,
                      width: tileSize,
                      height: tileSize,
                      margin: `${tilepadding}px`,
                    }}
                  >
                    <div className="value">{cell !== 0 ? cell : ''}</div>
                  </div>
                );
              })
            )}
            {/*tiles*/}
          </div>
        </div>
        {/* board */}

        <button
          onClick={() => {
            setGrid(addRandom(initial_state, true));
            setOld([]);
          }}
        >
          Reset
        </button>

        {/* <div id="old">
          {showArray(old)}
          {Array.isArray(old)
            ? old.map((x, i) => <div key={i}>{showArray(x)}</div>)
            : `${typeof old} ${old}`}
        </div> */}
      </header>
    </div>
  );
}

function mergeLeft(row) {
  let new_vals = [...row];
  let merged_vals = [];

  for (let i = 0; i < row.length; ++i) {
    const test_cell = new_vals.shift();

    if (test_cell && test_cell === new_vals[0]) {
      let cell2 = new_vals.shift();
      let merged_cell = test_cell + cell2;
      merged_vals.push(merged_cell);

      //console.log(test_cell ? true : false);
    } else if (test_cell) {
      merged_vals.push(test_cell);
    }
  }

  //merged_vals.map((cell) => new_vals.unshift(cell));
  return [...merged_vals];
}
//export default App;

const clone = (matrix) => JSON.parse(JSON.stringify(matrix));

function rotate(matrix, ccw) {
  const columns = matrix.map((_, column) => {
    const x = matrix.map((row) => row[column]);
    return ccw ? x : x.reverse();
  });

  return ccw ? columns.reverse() : columns;
}
