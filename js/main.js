var guidCounter = 0, nodeEditorModeOn = false, startNode;
const UI = {
  toolbar         : () => document.getElementById('toolbar'),
  ribbonMenu      : () => document.getElementById('ribbon-menu'),
  resistorSpawner : () => document.getElementById('resistor-spawner'),
  voltageSpawner  : () => document.getElementById('voltage-spawner'),
};

const connectorCreatorFactory = (type, symbol) => {
  return () => {
    let guid = `${type}-${guidCounter++}`;
    // console.log(guid);
    return [guid,
`<div id="${guid}" class="element-container">
  &nbsp;
  <div id="${guid}-block" class="element-block">${symbol}</div>
  <div id="${guid}-in"    class="element-input"  onclick="toggleNodeCreation('${guid}-in')">&nbsp;</div>
  <div id="${guid}-out"   class="element-output" onclick="toggleNodeCreation('${guid}-out')">&nbsp;</div>
</div>`];
  }
}

const resistorCreator = 
  connectorCreatorFactory('resistor', '&Omega;');
const batteryCreator = 
  connectorCreatorFactory('battery', '-+');

addDynamicElementAction(dragHandler);

function addResistor() {
  let [rGuid, rHtml] = resistorCreator();
  // console.log('rguid: ', rGuid);
  addDynamicElement(rHtml, rGuid, 'toolbar');
  newElem = document.getElementById(rGuid);
  newElem.style.left = "50px";
  newElem.style.top  = "50px";
};

function addBattery() {
  let [bGuid, bHtml] = batteryCreator();
  addDynamicElement(bHtml, bGuid, 'toolbar');
  newElem = document.getElementById(bGuid);
  newElem.style.left = "50px";
  newElem.style.top  = "160px";
}

const toggleNodeCreation = (ioId) => {

  const flipNodeCreationStatus = () => {
    nodeEditorModeOn = !nodeEditorModeOn; // flip node creation status
    console.log(nodeEditorModeOn);
  };

  let ioElem = document.getElementById(ioId);
  if (!nodeEditorModeOn) {
    flipNodeCreationStatus();
    startNode = ioId;
    return null;
  }
  startNode = document.getElementById(startNode); // until end of branch, startNode is an element!!!
  let yid = `node-${guidCounter++}`, 
      xid = `node-${guidCounter++}`;

  addDynamicElement(`<div id="${yid}" class="wire y">&nbsp;</div>`, yid, 'toolbar');
  addDynamicElement(`<div id="${xid}" class="wire x">&nbsp;</div>`, xid, 'toolbar');
  
  let yElem = document.getElementById(yid),
      xElem = document.getElementById(xid),
      dx = Math.abs(parseInt(ioElem.parentElement.style.left, 10) - parseInt(startNode.parentElement.style.left, 10)),
      dy = Math.abs(parseInt(ioElem.parentElement.style.top , 10) - parseInt(startNode.parentElement.style.top , 10)),
      x0 = Math.min(parseInt(ioElem.parentElement.style.left, 10),  parseInt(startNode.parentElement.style.left, 10)),
      y0 = Math.min(parseInt(ioElem.parentElement.style.top , 10),  parseInt(startNode.parentElement.style.top , 10));

  console.log(`${ioElem.parentElement.style.left} ${startNode.parentElement.style.left}
  x0: ${x0}px; y0: ${y0}px`);

  // up + right:

  // down + right:

  // up + left:

  // down + left: 

  yElem.style.left = x0 + 10 + "px";
  yElem.style.top  = y0 + 30 + "px";
  
  xElem.style.top  = y0 + 30 + dy + "px"; 
  xElem.style.left = x0 + 10 + "px";

  yElem.style.height = dy + "px";
  xElem.style.width  = dx + "px";
  flipNodeCreationStatus();
}