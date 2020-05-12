function Slider(sliderElementId, valueElementValueId) {
  this._sliderElement = document.getElementById(sliderElementId);
  this._valueElement = document.getElementById(valueElementValueId);
  this._valueElement.textContent = this._sliderElement.value;
  this._sliderElement.oninput = () => {
    this._valueElement.textContent = this._sliderElement.value;
  };

  this.getValue = () => {
    return this._sliderElement.value;
  };
}
