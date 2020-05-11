function Dfs() {
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

  this.start = (root, height) => {
    let stack = [];
    stack.push(root);
    let endNode = null;
    let visited = [];

    let traverse = () => {
      let current = stack.pop();
      let key = this._getKey(current.cell.row, current.cell.col, height);

      if (visited[key] && stack.length > 0) {
        traverse();
        return;
      }

      visited[key] = true;

      this._notifyOnVisited(current.cell);

      if (current.cell.isEnd) {
        endNode = current;
        console.log("End node found", endNode);
        return;
      } else {
        current.nodes.forEach((node) => {
          let key = this._getKey(node.cell.row, node.cell.col, height);
          if (visited[key]) return;
          if (node.cell.isWall === false) {
            stack.push(node);
          }
        });
      }

      if (stack.length > 0) {
        setTimeout(traverse, 25);
      }
    };

    traverse();
  };

  this._getKey = (row, col, height) => {
    return row * (height * 10) + col;
  };
}
