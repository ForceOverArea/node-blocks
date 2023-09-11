const dragHandler = (elemId) => {
  
  const dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  const elementDrag = (e) => {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elem.style.top  = (elem.offsetTop  - pos2) + "px";
    elem.style.left = (elem.offsetLeft - pos1) + "px";
  }

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  var pos1 = 0, 
    pos2 = 0, 
    pos3 = 0, 
    pos4 = 0,
    elem = document.getElementById(elemId);
  
  if (document.getElementById(elemId + "-block")) {
    document.getElementById(elemId + "-block").onmousedown = 
      dragMouseDown;
  } else {
    // console.log(elemId);
    elem.onmousedown = dragMouseDown;
  }
}