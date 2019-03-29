import React, { useState, useEffect } from "react";

import Mousetrap from "mousetrap";

import Board from "./Components/Board";

import { addRandom, moveLeft } from "./gameLogic";
import { clone, rotate } from "./utils";

import "./App.css";

//const initial_state = [[2, 2, 2, 2], [0, 2, 6, 0], [4, 4, 7, 0], [0, 4, 8, 0]];
const initial_state = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

export default function Game() {
  const [grid, setGrid] = useState(addRandom(initial_state, true));
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

  function reset() {
    setGrid(addRandom(initial_state, true));
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
    setGrid(matrix);
  }

  return (
    <div className="App">
      <header className="App-header">
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
