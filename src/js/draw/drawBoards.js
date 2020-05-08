function DrawBoard(setContentFunction) {
  this.disableEvents = false;
  this.board = null;
  this.table = null;

  this.setCellWall = (row, col) => {
    this.board[row][col].className = "cell cell-wall";
  };

  this.initialize = (width, height, onCellClickFunction) => {
    let board = [];
    let table = document.createElement("TABLE");
    table.className = "board";

    let onClick = (row, col) => {
      if (this.disableEvents) return;
      onCellClickFunction(row, col);
    };

    let onMouseOver = (row, col, event) => {
      event.preventDefault();
      if (event.buttons === 1) onClick(row, col);
    };

    for (let row = 0; row < height; row++) {
      board[row] = [];
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
        board[row][col] = cell;
      }
      table.appendChild(tr);
    }

    this.table = table;
    this.board = board;
    setContentFunction(this.table);
  };
}
