"use strict";

function Board(width, height) {
  this.cells = [];
  this.startCell = null;
  this.endCell = null;

  this.initialize = (width, height) => {
    for (let row = 0; row < height; row++) {
      var rowCells = [];
      for (let col = 0; col < width; col++) {
        //let random = Math.round(Math.random() * 10) % 6;

        let cell = new Cell(row, col);
        rowCells[col] = cell;
        //if (random == 0) cell.isWall = true;
      }
      this.cells[row] = rowCells;
    }

    let randomRow = Math.round(Math.random() * 1544) % height;
    let randomCol = Math.round(Math.random() * 1234) % width;

    this.startCell = this.cells[randomRow][randomCol];
    this.startCell.isStart = true;
    this.startCell.isWall = false;

    randomRow = Math.round(Math.random() * 1544) % height;
    randomCol = Math.round(Math.random() * 1234) % width;

    this.endCell = this.cells[randomRow][randomCol];
    this.endCell.isEnd = true;
    this.endCell.isWall = false;
  };

  this.initialize(width, height);
}
