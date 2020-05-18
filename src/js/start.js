"use strict";

const boardContainer = document.getElementById("boardContainer");
const speedSlider = new Slider("speed", "speed-value");
const algoTitle = new AlgorithmTitle();
const algoSelector = new AlgorithmSelector();
const algoToggle = new ToogleButton(
  "algorithm",
  "container-algorithm-items",
  "container-menu-toggle togglemenu-hidden",
  "container-menu-toggle togglemenu-visible"
);

const height = 31;
const width = 75;
const cellsToVisit = [];
const board = new Board(width, height);
const drawBoard = new DrawBoard(addDrawBoardToDOM);

let isVisiting = false;
let path = [];

(function setup() {
  initBoard();

  const startBtn = document.getElementById("start");
  startBtn.addEventListener("click", start);

  const mazeBtn = document.getElementById("maze");
  mazeBtn.addEventListener("click", drawMaze);

  algoSelector.subscribeToSelectionChanged(() => {
    algoTitle.setTitle(algoSelector.getSelectedText());
  });
})();

function onCellClick(row, col) {
  console.log(board);
  const cell = board.cells[row][col];
  if (cell.isWall || cell.isEnd || cell.isStart) return;
  cell.isWall = true;
  drawBoard.setCellWall(row, col);
}

function addDrawBoardToDOM(drawBoardElement) {
  if (boardContainer.firstChild)
    boardContainer.replaceChild(drawBoardElement, boardContainer.firstChild);
  else boardContainer.appendChild(drawBoardElement);
}

function initBoard() {
  drawBoard.initialize(width, height, onCellClick);
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      let cell = board.cells[row][col];
      if (cell.isWall) drawBoard.setCellWall(row, col);
      else if (cell.isStart) drawBoard.setCellStart(row, col);
      else if (cell.isEnd) drawBoard.setCellEnd(row, col);
    }
  }
}

function drawMaze() {
  let maze = new Maze();
  let walls = maze.generateMaze(width, height);
  let wallQueue = [];

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (walls[row][col].isWall) {
        let cell = board.cells[row][col];
        if (!cell.isStart && !cell.isEnd) {
          wallQueue.push(cell);
          cell.isWall = true;
        }
      }
    }
  }

  wallCell(wallQueue);
}

function wallCell(wallQueue) {
  if (wallQueue.length == 0) return;

  let lastWall = wallQueue.pop();
  drawBoard.setCellWall(lastWall.row, lastWall.col);

  if (wallQueue.length == 0) return;

  let firstWall = wallQueue.shift();
  drawBoard.setCellWall(firstWall.row, firstWall.col);

  setTimeout(() => wallCell(wallQueue), 0);
}

function resetBoard() {
  cellsToVisit.splice(0, cellsToVisit.length);
}

function startVisiting() {
  if (isVisiting) return;
  isVisiting = true;
  visitCell();
}

function visitCell() {
  if (cellsToVisit.length > 0) {
    const cell = cellsToVisit.pop();
    if (!cell.isStart && !cell.isEnd)
      drawBoard.setCellVisited(cell.row, cell.col);
    setTimeout(visitCell, speedSlider.getValue());
  } else if (path.length > 0) {
    const node = path.pop();
    if (!node.cell.isStart && !node.cell.isEnd)
      drawBoard.setCellPath(node.cell.row, node.cell.col);
    setTimeout(visitCell, speedSlider.getValue());
  } else isVisiting = false;
}

function start() {
  let algorithm = getAlgorithm();
  if (!algorithm) return;

  resetBoard();

  drawBoard.disableEvents = true;
  let tree = new Tree();
  let root = tree.build(board.cells, board.startCell);

  algorithm.subscribeToOnVisited((cell) => {
    cellsToVisit.unshift(cell);
    if (!isVisiting && cellsToVisit.length > 0) startVisiting();
  });

  path = algorithm.start(root, height);
  algorithm.removeSubscriptions();
}

function getAlgorithm() {
  const factory = new AlgoFactory();
  const algo = algoSelector.getSelectedValue();
  return algo ? factory.resolve(algo) : null;
}
