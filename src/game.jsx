import React, { useState, useEffect } from "react";

import Mousetrap from "mousetrap";

import Board from "./Components/Board";
import Cell from "./cell";
import { addRandom, moveLeft } from "./gameLogic";
import { clone, rotate } from "./utils";

import "./App.css";

//const initial_state = [[2, 2, 2, 2], [0, 2, 6, 0], [4, 4, 7, 0], [0, 4, 8, 0]];
const initial_state = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

export default function Game() {
  const [grid, setGrid] = useState(setup());
  const [old, setOld] = useState([]);
  const size = 4;
  const tileSize = 100;
  const tilepadding = 5;

  useEffect(() => {
    Mousetrap.bind(["left", "a"], () => moveDirection(0));
    Mousetrap.bind(["up", "w"], () => moveDirection(1));
    Mousetrap.bind(["right", "d"], () => moveDirection(2));
    Mousetrap.bind(["down", "s"], () => moveDirection(3));
    return () => {
      Mousetrap.unbind(["left", "a"]);
      Mousetrap.unbind(["up", "w"]);
      Mousetrap.unbind(["right", "d"]);
      Mousetrap.unbind(["down", "s"]);
    };
  });

  function updateCoordinates(matrix) {
    const temp = clone(matrix);

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < temp[row].length; col++) {
        if (typeof temp[row][col] == "object") {
          temp[row][col].oldRow = temp[row][col].row;
          temp[row][col].oldCol = temp[row][col].col;
          temp[row][col].row = row;
          temp[row][col].col = col;
          //console.log(temp[row][col]);
        }
      }
    }
    console.log("running");
    return temp;
  }

  function setup() {
    return updateCoordinates(addRandom(initial_state, true));
  }

  function reset() {
    setGrid(setup());
    setOld([]);
  }

  function moveDirection(dirNum) {
    let matrix = clone(grid);
    for (let i = 0; i < dirNum; i++) {
      matrix = rotate(matrix, true);
    }
    matrix = moveLeft(matrix);
    for (let i = 0; i < dirNum; i++) {
      matrix = rotate(matrix, false);
    }
    matrix = updateCoordinates(matrix);
    setGrid(matrix);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Grid Test</h1>

        <Board
          grid={grid}
          tileSize={tileSize}
          tilepadding={tilepadding}
          size={size}
        />

        <button onClick={reset}>Reset</button>
      </header>
    </div>
  );
}
//export default App;
