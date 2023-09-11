const _dynamicElements_ = [];
const _dynamicElementActions_ = [];
const _refreshDynamicElements_ = () => {
  for (elemId of _dynamicElements_) {
    for (action of _dynamicElementActions_)
      action(elemId);
  }
}

const addDynamicElement = (elemHtml, elemId, parentNode) => {
  document.getElementById(parentNode).innerHTML += elemHtml;
  _dynamicElements_.push(elemId);
  // console.log(`dynamic elements: ${_dynamicElements_}`)
  _refreshDynamicElements_();
}

const addDynamicElementAction = (callback) => {
  _dynamicElementActions_.push(callback);
}

