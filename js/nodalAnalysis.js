const system = [];
var gndIsInitialized = false;

function nodes(n) {
  let result = [];
  for (let i=0; i < n; i++) {
    result.push(new Node);
  }
  return result;
}

class Node {
  constructor() {
    this.isLocked   = false;
    this.potential  = 1;
    this.inputs     = [];
    this.outputs    = [];
    system.push(this);
  }

  getPotential() {
    return this.potential;
  }

  setPotential(potential) {
    this.potential = potential;
  }

  flowBalance(potentialGuess) {
    let balance = 0;
    let previousPotential = this.potential;
    this.potential = potentialGuess;

    for (let i of this.inputs) {
      balance += i.flow();
    }

    for (let o of this.outputs) {
      balance -= o.flow();
    }

    this.potential = previousPotential;
    return balance;
  }
}

class Resistor {
  constructor() {
    this.inputNode  = null;
    this.outputNode = null;
    this.value = 1;
  }

  getValue() {
    return this.value;
  }

  setValue(resistance) {
    this.value = resistance;
  }

  flow() {
    return (this.inputNode.getPotential() - 
      this.outputNode.getPotential()) / this.value;
  }

  connectToInput(node) {
    this.inputNode = node;
    node.outputs.push(this);
  }

  connectToOutput(node) {
    this.outputNode = node;
    node.inputs.push(this);
  }
}

class Battery extends Resistor {

  flow() {
    return this.outputNode.flowBalance();
  }

  connectToOutput(node) {
    this.outputNode = node;
    node.isLocked = true;
    node.getPotential = 
      () => this.inputNode.getPotential() + this.getValue();
  }
}

class Ground {
  constructor() {
    if (gndIsInitialized === true) {
      alert('WARN: you cannot initialize more than one ground node!');
      return null;
    }
    gndIsInitialized = true;
  }

  connectToGround(node) {
    this.node = node;
    node.setPotential(0);
    node.isLocked = true;
  }
}