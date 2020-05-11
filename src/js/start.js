"use strict";

const boardContainer = document.getElementById("boardContainer");
const height = 30;
const width = 30;
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
  // let maze = new Maze();
  // let walls = maze.generateMaze(width, height);

  // for (let row = 0; row < height; row++) {
  //   for (let col = 0; col < width; col++) {
  //     if (walls[row][col].isWall) mainBoard.board.setCellWall(row, col);
  //   }
  // }

  let board = new Board(width, height);
  let tree = new Tree();
  let root = tree.build(board.cells, board.startCell);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      let cell = board.cells[row][col];
      if (cell.isWall) mainBoard.board.setCellWall(row, col);
      else if (cell.isStart) mainBoard.board.setCellStart(row, col);
      else if (cell.isEnd) mainBoard.board.setCellEnd(row, col);
    }
  }

  console.log(root);

  let dfs = new Dfs();
  dfs.start(
    root,
    (row, col) => mainBoard.board.setCellVisited(row, col),
    () => {}
  );
})();
