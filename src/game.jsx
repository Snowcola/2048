import React, { useState, useEffect } from "react";

import Mousetrap from "mousetrap";

import Board from "./Components/Board";
import Button from "./Components/Button";
import { addRandom, moveLeft } from "./gameLogic";
import { clone, rotate } from "./utils";

import "./App.css";

const initial_state = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

export default function Game() {
  const [grid, setGrid] = useState(setup());
  const [mergedTiles, setMergedTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [old, setOld] = useState([]);
  const size = 4;
  const tileSize = 100;
  const tilepadding = 5;

  useEffect(() => {
    setScore(score + points);
  }, [points]);

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
        }
      }
    }
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
    let leftOver;
    for (let i = 0; i < dirNum; i++) {
      matrix = rotate(matrix, true);
    }
    matrix = moveLeft(matrix, setMergedTiles, setPoints);

    for (let i = 0; i < dirNum; i++) {
      matrix = rotate(matrix, false);
    }
    matrix = updateCoordinates(matrix);
    setGrid(matrix);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>2048</h1>
        <h1>Score: {score}</h1>
        <Button click={reset}>Reset</Button>

        <Board
          grid={grid}
          ui_grid={mergedTiles}
          tileSize={tileSize}
          tilepadding={tilepadding}
          size={size}
        />
      </header>
    </div>
  );
}
