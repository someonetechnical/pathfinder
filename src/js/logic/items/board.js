"use strict";

function Board(width, height) {

  this.cells = [];

  this.initialize = (width, height) => {
    for (let row = 0; row < height; row++) {
      var rowCells = [];
      for (let col = 0; col < width;col++) {
        rowCells[index] = new Cell(row, col);
      }
      cells[index] = rowCells;
    }
  }

  this.draw = function (width, height, onCellClickFunction) {
    let table = document.createElement("TABLE");
    table.className = "board";

    let onClick = (row, col, element) => {
      onCellClickFunction(
        row,
        col,
        (classNames) => (element.className = classNames)
      );
    };

    let onMouseOver = (row, col, event) => {
      event.preventDefault();
      if (event.buttons === 1) onClick(row, col, event.srcElement);
    };

    for (let row = 0; row < height; row++) {
      let tr = document.createElement("TR");
      tr.className = `row`;
      for (let col = 0; col < width; col++) {
        let cell = document.createElement("TD");
        cell.className = `cell`;
        cell.addEventListener("mouseover", (event) =>
          onMouseOver(row, col, event)
        );
        cell.addEventListener("mousedown", (event) => {
          event.preventDefault();
          onClick(row, col, event.srcElement);
        });
        tr.appendChild(cell);
      }
      table.appendChild(tr);
    }

    return table;
  };

  initialize(width, height);
}
