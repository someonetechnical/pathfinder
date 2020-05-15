function AlgorithmTitle() {
  this._titleElement = document.getElementById("algorithm-title");

  this.setTitle = (title) => {
    console.log(title);
    this._titleElement.innerHTML  = title;
  };
}
