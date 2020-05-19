function DrawWall(drawBoard, width, height) {
  this.drawWalls = (walls) => {
    drawLeftCol(walls, 0);
    drawRightCol(walls, width - 1);
    drawTopRow(walls, 0);
    drawBottomRow(walls, height - 1);
  };

  function drawLeftCol(walls, leftCol) {
    if (leftCol > width / 2) return;
    let left = walls.filter((elem) => elem.col === leftCol);
    drawWalls(left, () => drawLeftCol(walls, leftCol + 1));
  }

  function drawRightCol(walls, rightCol) {
    if (rightCol < width / 2) return;
    let right = walls.filter((elem) => elem.col === rightCol);
    drawWalls(right, () => drawRightCol(walls, rightCol - 1));
  }

  function drawTopRow(walls, topRow) {
    if (topRow > height / 2) return;
    let top = walls.filter((elem) => elem.row === topRow);
    drawWalls(top, () => drawTopRow(walls, topRow + 1));
  }

  function drawBottomRow(walls, bottomRow) {
    if (bottomRow < height / 2) return;
    let bottom = walls.filter((elem) => elem.row === bottomRow);
    drawWalls(bottom, () => drawBottomRow(walls, bottomRow - 1));
  }

  function drawWalls(walls, callbackWhenFinished) {
    if (walls.length == 0) {
      callbackWhenFinished();
      return;
    }

    let lastWall = walls.pop();
    drawBoard.setCellWall(lastWall.row, lastWall.col);

    if (walls.length == 0) {
      callbackWhenFinished();
      return;
    }

    let firstWall = walls.shift();
    drawBoard.setCellWall(firstWall.row, firstWall.col);

    setTimeout(() => drawWalls(walls, callbackWhenFinished), 0);
  }
}
