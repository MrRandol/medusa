export interface BadnessDefinition {
    badness: number;
    height: number;
}

export class GraphEdge<T> {
    value: T;
    sourceIndex: number;
    targetIndex: number;

    constructor(value: T, source: number, target: number) {
        this.value = value
        this.sourceIndex = source;
        this.targetIndex = target;
    }
}

export class GraphNode<T> {
    index: number;
    edges: GraphEdge<T>[];
  
    constructor(value: number) {
        this.index = value;
        this.edges = [];
    }
  
    addEdge(edge: GraphEdge<T>) {
        this.edges.push(edge);
    }

    getOutgoingEdges(): GraphEdge<T>[] {
        return this.edges.filter(e => e.sourceIndex === this.index)
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
  
    addEdge(source: number, destination: number, value: T) {
        
        var sourceNode = this.getNodeByIndex(source);
        
        if (sourceNode.edges.find(e => e.sourceIndex === source && e.targetIndex === destination)) {
            return;
        }
        
        var edge = new GraphEdge<T>(value, source, destination)
        var destNode = this.getNodeByIndex(destination);

        sourceNode.addEdge(edge);
        destNode.addEdge(edge);
    }

}
  