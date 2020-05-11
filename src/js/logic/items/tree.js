function Tree() {
  this.build = (cells, start) => {
    let queue = [];
    let visited = [];
    let initial = start;
    let root = new Node();
    root.cell = initial;
    root.nodes = [];
    queue.push(root);

    let allNodes = [];

    while (queue.length > 0) {
      //debugger;
      let current = queue.shift();
      let row = current.cell.row;
      let col = current.cell.col;
      let key = this.getKey(row, col);

      if (visited[key]) continue;
      visited[key] = true;

      this.visitNode(current, allNodes, cells);

      if (current.nodes.length === 0)
        console.log("current", current, "no elements");

      current.nodes.forEach((node) => {
        if (visited[node.cell.row] && visited[node.cell.row][node.cell.col])
          return;

        queue.push(node);
      });
    }

    return root;
  };

  this.visitNode = (node, allNodes, cells) => {
    this.addLeftChild(node, allNodes, cells);
    this.addRightChild(node, allNodes, cells);
    this.addUpChild(node, allNodes, cells);
    this.addDownChild(node, allNodes, cells);
  };

  this.addLeftChild = (node, allNodes, cells) => {
    let col = node.cell.col - 1;
    let row = node.cell.row;
    if (col >= 0) {
      this.addChildNode(node, allNodes, cells, row, col);
    }
  };

  this.addRightChild = (node, allNodes, cells) => {
    let col = node.cell.col + 1;
    let row = node.cell.row;

    if (col < cells[row].length) {
      this.addChildNode(node, allNodes, cells, row, col);
    }
  };

  this.addUpChild = (node, allNodes, cells) => {
    let col = node.cell.col;
    let row = node.cell.row - 1;
    if (row >= 0) {
      this.addChildNode(node, allNodes, cells, row, col);
    }
  };

  this.addDownChild = (node, allNodes, cells) => {
    let col = node.cell.col;
    let row = node.cell.row + 1;

    if (row < cells.length) {
      this.addChildNode(node, allNodes, cells, row, col);
    }
  };

  this.addChildNode = (parrentNode, allNodes, cells, row, col) => {
    const key = this.getKey(row, col);
    let node = allNodes[key];
    if (!node) {
      const cell = this.getCell(cells, row, col);
      if (!cell) return;

      node = new Node();
      node.cell = cell;
      node.nodes = [];

      if (allNodes[key]) console.log("duplicate node");
      
      allNodes[key] = node;
    }

    parrentNode.nodes.push(node);
  };

  this.getKey = (row, col) => {
    return row * 10 + col;
  };

  this.getCell = (cells, row, col) => {
    if (row < cells.length && row >= 0 && col >= 0) {
      var r = cells[row];
      if (col < r.length) {
        let cell = r[col];
        if (cell.isWall) return null;
        return cell;
      }
    }
  };

  this.addToQueueAndNodesIfExists = (
    queue,
    current,
    visited,
    allCells,
    row,
    col
  ) => {
    if (row < allCells.length && row >= 0 && col >= 0) {
      var r = allCells[row];
      if (col < r.length) {
        if (visited[row] && visited[row][col]) {
          current.nodes.push(visited[row][col]);
          return;
        }

        let c = r[col];
        let node = new Node();
        node.cell = c;
        node.parrent = current;
        node.nodes = [];

        queue.push(node);
        current.nodes.push(node);
      }
    }
  };
}
