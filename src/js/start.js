"use strict";

const boardContainer = document.getElementById("boardContainer");
const height = 33;
const width = 61;
const mainBoard = {};

(function setup() {
  let onCellClick = (row, col) => {
    mainBoard.board.setCellWall(row, col);
  };

  mainBoard.board = new DrawBoard((content) =>
    boardContainer.appendChild(content)
  );
  mainBoard.board.initialize(width, height, onCellClick);
  mainBoard.board.disableEvents = true;

  let board = new Board(width, height);
  let maze = new Maze();
  let walls = maze.generateMaze(width, height);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (walls[row][col].isWall) {
        let cell = board.cells[row][col];
        if (!cell.isStart && !cell.isEnd) cell.isWall = true;
      }
    }
  }

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      let cell = board.cells[row][col];
      if (cell.isWall) mainBoard.board.setCellWall(row, col);
      else if (cell.isStart) mainBoard.board.setCellStart(row, col);
      else if (cell.isEnd) mainBoard.board.setCellEnd(row, col);
    }
  }

  let tree = new Tree();
  let root = tree.build(board.cells, board.startCell);
  let dfs = new Dfs();
  dfs.subscribeToOnVisited((cell) => {
    if (!cell.isStart && !cell.isEnd)
      mainBoard.board.setCellVisited(cell.row, cell.col);
  });

  dfs.start(root, height);
})();
