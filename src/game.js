import Cell from "./cell";

export default class Game {
  constructor() {
    this.score = 0;
    this.size = 4;
    this.data = this.spawnGameData();
    this.goal = 2048;
    this.goalReached = false;
    this.chanceOfFour = 0.08;

    this.correctPositions();
  }

  spawnGameData() {
    let data = [];
    for (let rpw = 1; row < this.size; row++) {
      rowData = [];
      for (let col = 0; col < this.size; col++) {
        rowData.push(
          new Cell({
            value: 0,
            row: -1,
            col: -1,
            oldRow: -1,
            oldCol: -1,
            newTile: false,
            merged: false
          })
        );
      }
      data.push(rowData);
    }
    return data;
  }

  checkGameOver() {
    // check for goal reached
    let emptyCells = [];
    this.data.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell.value === 0) {
          emptyCells.push({ x: cIdx, y: rIdx });
        } else if (cell.value >= this.goal) {
          this.goalReached = true;
          this.goal *= 2;
        }
      });
    });

    // add new cell
    let newCellLocation =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    let newCellValue = Math.random() < this.chanceOfFour ? 4 : 2;
    this.data[newCellLocation.y][newCellLocation.x] = new Cell({
      value: newCellValue,
      row: newCellLocation.y,
      col: newCellLocation.x
    });
  }

  move(directionNumber) {}
}

const directions = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3
};

Game.dir = directions;
