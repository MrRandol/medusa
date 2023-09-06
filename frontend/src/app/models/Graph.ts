export interface BreakDefinition {
    badness: number;
    sourceIndex: number;
    targetIndex: number;
    height: number;
}


export class GraphNode<T> {
    value: T;
    nodesTo: number[];
    nodesFrom: number[];
  
    constructor(value: T) {
        this.value = value;
        this.nodesTo = [];
        this.nodesFrom = [];
    }
  
    addNodeDestination(node: number) {
        this.nodesTo.push(node);
        this.nodesTo = Array.from(new Set(this.nodesTo));
    }

    addNodeSource(node: number) {
        this.nodesFrom.push(node);
        this.nodesFrom = Array.from(new Set(this.nodesFrom));
    }
}

export class FixedSizeGraph<T> {
    nodes: GraphNode<T>[];
  
    constructor(size: number=0) {
        if (size <= 0 )  throw ("FixedSizeGraph needs at least 1 node")
        else this.nodes = new Array<GraphNode<T>>(size);
    }
  
    getNodeByIndex(i: number): GraphNode<T> {
        return this.nodes[i];
    }

    addNodeAtIndex(i: number, node: GraphNode<T>) {
        if (this.nodes[i]) {
            throw ("Node " + i + " is already initialized.")
        } else {
            this.nodes[i] = node;
        }
    }
  
    addEdge(s: number, d: number) {
        var sourceNode = this.getNodeByIndex(s);
        var destNode = this.getNodeByIndex(d);
        sourceNode.addNodeDestination(d);
        destNode.addNodeSource(s);
    }

}
  