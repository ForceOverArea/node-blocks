class ConnectorBackend {
  constructor(gain) {
    this.downstreamNode = null;
    this.upstreamNode = null;
    this.gain = gain;
  }

  flow = () => (this.upstreamNode.potential - this.downstreamNode.potential) / this.gain;
} 

class NodeBackend {
  constructor() {
    this.potential  = 0;
    this.fixed      = false;
    this.inputs     = [];
    this.outputs    = [];
  }

  connect(connectorIoId) {
    if (connectorIoId.includes('in')) {
      this.outputs.push(connectorIoId);
    } else if (connectorIoId.includes('out')) {
      this.inputs.push(connectorIoId);
    } else {
      alert(`Error connecting node to element: ${connectorIoId}`);
    }
  }

  discrepancy(potential) {
    if (!this.potential) {
      this.potential = 1;
    }

    let total = 0;
    for (i of this.inputs) {
      total += i.flow();
    }
    for (o of this.outputs) {
      total -= o.flow();
    }
  }
}