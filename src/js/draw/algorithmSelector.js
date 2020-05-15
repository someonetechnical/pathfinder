function AlgorithmSelector() {
  this._algorithmList = document.getElementById("algorithm-list");
  this._selectChangedListener = null;
  this._selectedValue = null;
  this._selectedText = null;

  this.subscribeToSelectionChanged = (funcToInvoke) => {
    this._selectChangedListener = funcToInvoke;
  };

  this.getSelectedValue = () => {
    return this._selectedValue;
  };

  this.getSelectedText = () => {
    return this._selectedText;
  };

  this._notifySelection = () => {
    if (this._selectChangedListener) this._selectChangedListener();
  };

  this._onItemClick = (event) => {
    if (event.target === this._algorithmList) return;
    this._selectedValue = event.target.getAttribute("data-value");
    this._selectedText = event.target.innerHTML;
    this._notifySelection();
  };

  this._algorithmList.onclick = this._onItemClick;
}
