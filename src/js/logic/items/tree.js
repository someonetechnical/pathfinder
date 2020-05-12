function Tree() {
  this.build = (cells, start) => {
    let queue = [];
    let visited = [];
    let allNodes = [];
    let root = new Node();
    root.cell = start;
    root.nodes = [];
    queue.push(root);

    while (queue.length > 0) {
      let current = queue.shift();
      let key = this._getKey(current.cell.row, current.cell.col, cells.length);

      if (visited[key]) continue;
      visited[key] = true;

      this._visitNode(current, allNodes, cells);

      current.nodes.forEach((node) => {
        let key = this._getKey(
          node.cell.row,
          node.cell.col,
          cells.length
        );
        if (visited[key]) return;

        queue.push(node);
      });
    }

    return root;
  };

  this._visitNode = (node, allNodes, cells) => {
    this._addLeftChild(node, allNodes, cells);
    this._addRightChild(node, allNodes, cells);
    this._addUpChild(node, allNodes, cells);
    this._addDownChild(node, allNodes, cells);
  };

  this._addLeftChild = (node, allNodes, cells) => {
    let col = node.cell.col - 1;
    let row = node.cell.row;
    if (col >= 0) {
      this._addChildNode(node, allNodes, cells, row, col);
    }
  };

  this._addRightChild = (node, allNodes, cells) => {
    let col = node.cell.col + 1;
    let row = node.cell.row;

    if (col < cells[row].length) {
      this._addChildNode(node, allNodes, cells, row, col);
    }
  };

  this._addUpChild = (node, allNodes, cells) => {
    let col = node.cell.col;
    let row = node.cell.row - 1;
    if (row >= 0) {
      this._addChildNode(node, allNodes, cells, row, col);
    }
  };

  this._addDownChild = (node, allNodes, cells) => {
    let col = node.cell.col;
    let row = node.cell.row + 1;

    if (row < cells.length) {
      this._addChildNode(node, allNodes, cells, row, col);
    }
  };

  this._addChildNode = (parrentNode, allNodes, cells, row, col) => {
    const key = this._getKey(row, col, cells.length);
    let node = allNodes[key];
    if (!node) {
      const cell = this._getCell(cells, row, col);
      if (!cell) return;

      node = new Node();
      node.cell = cell;
      node.nodes = [];

      if (allNodes[key]) console.log("duplicate node");

      allNodes[key] = node;
    }

    parrentNode.nodes.push(node);
  };

  this._getKey = (row, col, height) => {
    return row * (height * 10) + col;
  };

  this._getCell = (cells, row, col) => {
    if (row < cells.length && row >= 0 && col >= 0) {
      var r = cells[row];
      if (col < r.length) {
        let cell = r[col];
        if (cell.isWall) return null;
        return cell;
      }
    }
  };
}
