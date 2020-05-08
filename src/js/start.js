"use strict";

const boardContainer = document.getElementById("boardContainer");
const height = 41;
const width = 51;
const clickedCells = [];
const mainBoard = {};

(function setup() {
  let onCellClick = (row, col) => {
    let value = !clickedCells[row][col];
    console.log("Clicked", row, col, value);

    clickedCells[row][col] = value;

    if (value) mainBoard.board.setCellWall(row, col);
  };

  for (let index = 0; index < height; index++) {
    let cells = [];

    for (let index = 0; index < width; index++) {
      cells[index] = false;
    }

    clickedCells[index] = cells;
  }

  mainBoard.board = new DrawBoard((content) =>
    boardContainer.appendChild(content)
  );
  mainBoard.board.initialize(width, height, onCellClick);

  let maze = new Maze();
  let walls = maze.generateMaze(width, height);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (walls[row][col].isWall) mainBoard.board.setCellWall(row, col);
    }
  }
})();

// function drawGrid(var width, var height)
// {

// }
