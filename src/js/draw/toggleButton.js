function ToogleButton(
  clickElementId,
  toggleElementId,
  initialClass,
  toggleClass
) {
  this._clickElement = document.getElementById(clickElementId);
  this._toggleElement = document.getElementById(toggleElementId);
  this._toggleElement.className = initialClass;
  this._toggled = false;

  this._toggle = () => {
    this._toggled = !this._toggled;
    this._toggleElement.className = this._toggled ? toggleClass : initialClass;
  };

  this._windowClick = (event) => {
    if (event.srcElement === this._clickElement) return;
    if (this._toggled) this._toggle();
  };

  document.addEventListener("click", this._windowClick);

  this._clickElement.onclick = (event) => {
    this._toggle();
  };
}
