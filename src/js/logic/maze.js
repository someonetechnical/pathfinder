function Maze() {
  this.generateMaze = (width, height) => {
    return this.generateWithDepthFirstSearch(width, height);
  };

  this.generateWithDepthFirstSearch = (width, height) => {
    let cells = this.initializeCells(width, height);
    let visitedCells = [];
    let startCell = cells[1][1];
    startCell.isWall = false;
    startCell.isVisited = true;
    visitedCells.push(startCell);

    while (visitedCells.length > 0) {
      let currentCell = visitedCells.pop();
      var newCell = this.getNeighbourNotVisitedCell(
        cells,
        currentCell,
        width,
        height
      );

      if (newCell !== null) {
        visitedCells.push(currentCell);
        this.markAdjacentCellsVisited(cells, currentCell, width, height);
        newCell.isVisited = true;
        newCell.isWall = false;
        let wall = this.getBetweenWall(currentCell, newCell, cells);
        wall.isWall = false;

        visitedCells.push(newCell);
      }
    }

    return cells;
  };

  this.initializeCells = (width, height) => {
    let cells = [];
    for (let row = 0; row < height; row++) {
      cells[row] = [];
      for (let col = 0; col < width; col++) {
        cells[row][col] = {
          row: row,
          col: col,
          isWall: true,
          isVisited:
            row === 0 || col === 0 || row === height - 1 || col === width - 1,
        };
      }
    }
    return cells;
  };

  this.getBetweenWall = (cell1, cell2, allCells) => {
    if (cell1.row !== cell2.row) {
      if (cell1.row === cell2.row - 2)
        return allCells[cell2.row - 1][cell2.col];

      return allCells[cell2.row + 1][cell2.col];
    }

    if (cell1.col === cell2.col - 2) return allCells[cell2.row][cell2.col - 1];

    return allCells[cell2.row][cell2.col + 1];
  };

  this.markAdjacentCellsVisited = (allCells, currentCell, width, height) => {
    let row = currentCell.row;
    let col = currentCell.col;

    if (col - 1 >= 0) allCells[row][col - 1].isVisited = true; //left
    if (col + 1 < width) allCells[row][col + 1].isVisited = true; //right
    if (row - 1 >= 0) allCells[row - 1][col].isVisited = true; //up
    if (row + 1 < height) allCells[row + 1][col].isVisited = true; //down
  };

  this.getNeighbourNotVisitedCell = (allCells, currentCell, width, height) => {
    let row = currentCell.row;
    let col = currentCell.col;
    let cell = null;
    let random = Math.round(Math.random() * 10) % 4;

    switch (random) {
      case 0:
        cell = this.getNotVisitedCell(allCells, col - 2, row, width, height);
        if (cell !== null) break;
      case 1:
        cell = this.getNotVisitedCell(allCells, col + 2, row, width, height);
        if (cell !== null) break;
      case 2:
        cell = this.getNotVisitedCell(allCells, col, row - 2, width, height);
        if (cell !== null) break;
      case 3:
        cell = this.getNotVisitedCell(allCells, col, row + 2, width, height);
        break;
    }

    return cell;
  };

  this.getNotVisitedCell = (allCells, col, row, width, height) => {
    if (col >= 0 && col < width && row >= 0 && row < height) {
      let c = allCells[row][col];
      if (!c.isVisited) return c;
    }
    return null;
  };
}
