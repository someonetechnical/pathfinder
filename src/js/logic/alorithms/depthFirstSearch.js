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

  // this.start = (cells, startCell, endCell, pointCells) => {
  //   let stack = [];
  //   stack.push(startCell);
  //   let endNode = null;
  //   let visited = [];

  //   let traverse = () => {
  //     debugger;
  //     console.log("traverse stack", stack);
  //     let current = stack.pop();

  //     if (!visited[current.cell.row]) visited[current.cell.row] = [];
  //     // else if (visited[current.cell.row][current.cell.col]) {
  //     //   if (stack.length > 0) {
  //     //     setTimeout(traverse, 500);
  //     //   }

  //     //   return;
  //     // }

  //     visited[current.cell.row][current.cell.col] = true;

  //     if (!current.cell.isStart)
  //       setIsVisitedFunction(current.cell.row, current.cell.col);

  //     if (current.cell.isEnd) {
  //       endNode = current;
  //       console.log("End node found", endNode);
  //       return;
  //     } else {
  //       current.nodes.forEach((node) => {
  //         if (visited[node.cell.row] && visited[node.cell.row][node.cell.col])
  //           return;

  //         if (node.cell.isWall === false) stack.push(node);
  //       });
  //     }

  //     if (stack.length > 0) {
  //       setTimeout(traverse, 100);
  //     }
  //   };

  //   traverse();
  // };
  
  this.start = (root, setIsVisitedFunction, setIsPathFunction) => {
    let stack = [];
    stack.push(root);
    let endNode = null;
    let visited = [];

    let traverse = () => {
      debugger;
      console.log("traverse stack", stack);
      let current = stack.pop();

      if (!visited[current.cell.row]) visited[current.cell.row] = [];
      visited[current.cell.row][current.cell.col] = true;

      if (!current.cell.isStart)
        setIsVisitedFunction(current.cell.row, current.cell.col);

      if (current.cell.isEnd) {
        endNode = current;
        console.log("End node found", endNode);
        return;
      } else {
        current.nodes.forEach((node) => {
          if (visited[node.cell.row] && visited[node.cell.row][node.cell.col])
            return;

          if (node.cell.isWall === false) stack.push(node);
        });
      }

      if (stack.length > 0) {
        setTimeout(traverse, 100);
      }
    };

    traverse();
  };
}
