function AlgoFactory() {
  this.resolve = (algo) => {
    switch (algo) {
      case "bfs":
        return new Bfs();
      case "dfs":
        return new Dfs();
      default:
        throw `Invalid algorithm identifier ${algo}. Can't instantiate correct algorithm.`;
    }
  };
}
