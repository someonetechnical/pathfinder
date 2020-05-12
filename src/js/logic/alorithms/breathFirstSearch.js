function Bfs() {
  this.subscribeToOnPathFound = (onPathFoundFuncToNofify) => {
    this._onPathFoundFuncToNofify = onPathFoundFuncToNofify;
  };

  this._notifyOnPathFound = (cells) => {
    if (this._onPathFoundFuncToNofify) this._onPathFoundFuncToNofify(cells);
  };

  this.subscribeToOnVisited = (onVisitedFuncToNofify) => {
    this._onVisitedFuncToNofify = onVisitedFuncToNofify;
  };

  this._notifyOnVisited = (cell) => {
    if (this._onVisitedFuncToNofify) this._onVisitedFuncToNofify(cell);
  };

  this.removeSubscriptions = () => {
    this._onVisitedFuncToNofify = undefined;
    this._onPathFoundFuncToNofify = undefined;
  };

  this.start = (root, height) => {
    let queue = [];
    queue.push(root);
    let endNode = null;
    let visited = [];
    let previous = new Map();

    while (queue.length > 0) {
      let current = queue.shift();
      let key = this._getKey(current.cell.row, current.cell.col, height);

      if (visited[key] && queue.length > 0) {
        continue;
      }

      visited[key] = true;

      this._notifyOnVisited(current.cell);

      if (current.cell.isEnd) {
        endNode = current;
        console.log("End node found", endNode);
        break;
      } else {
        current.nodes.forEach((node) => {
          let key = this._getKey(node.cell.row, node.cell.col, height);
          if (visited[key]) return;
          if (node.cell.isWall === false) {
            previous.set(node, current);
            queue.push(node);
          }
        });
      }
    }

    let path = [];
    let pathNode = endNode;
    while (pathNode) {
      path.push(pathNode);
      pathNode = previous.get(pathNode);
    }

    return path;
  };

  this._getKey = (row, col, height) => {
    return row * (height * 10) + col;
  };
}
