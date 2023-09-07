import { Injectable } from "@angular/core";
import { Dimension } from "../models/Media";
import { UiConfig } from "../models/UIConfig";
import { BadnessDefinition, FixedSizeGraph, GraphEdge, GraphNode } from "../models/Graph";
import { PathSegment } from "../models/Row";

@Injectable({
    providedIn: 'root'
})

export class MediaTreeHelperService {
    
    static GetOptimalPath(graph: FixedSizeGraph<BadnessDefinition>): PathSegment[] {
        return MediaTreeHelperService.DiveRecursivelyForOptimalPath(graph, 0, 0);
    }

    static DiveRecursivelyForOptimalPath(graph: FixedSizeGraph<BadnessDefinition>, fromIndex: number, totalBadness: number): PathSegment[] {
        if(fromIndex >= graph.nodes.length) {
            return []
        }

        var node = graph.getNodeByIndex(fromIndex);
        var edges = node.getOutgoingEdges();
        if (edges.length === 0) {
            return [];
        }

        var segmentFromHere = edges.map(e => ({source: e.sourceIndex, target: e.targetIndex, height: e.value.height, badness: e.value.badness + totalBadness}))
        var potentialPathsFromHere = segmentFromHere.map(path => {
            var paths = this.DiveRecursivelyForOptimalPath(graph, path.target + 1, path.badness);
            paths.unshift(path);
            return paths;
        })

        var bestPath: PathSegment[] = []
        potentialPathsFromHere.forEach(path => {
            if (bestPath.length === 0 || bestPath[bestPath.length - 1].badness > path[path.length - 1].badness) {
                bestPath = path;
                return;
            }
        })

        return bestPath;
    }

    static GenerateFlexLayoutGraph(config: UiConfig, boxes: Dimension[]): FixedSizeGraph<BadnessDefinition> {
        var graph = new FixedSizeGraph<BadnessDefinition>(boxes.length);
        for (var i = 0; i < boxes.length; i++) {
            var node = new GraphNode<BadnessDefinition>(i);
            graph.addNodeAtIndex(i, node);
        }
        var ratio = 1;
        var adjustedBoxes: Dimension[] = boxes.map (b => {
            ratio = config.targetHeight / b.h;
            return {
                h: ratio * b.h,
                w: ratio * b.w
            }
        })
        graph = MediaTreeHelperService.GetBreaksAndDiveRecursively(0, config, adjustedBoxes, graph);
        return graph;
    }

    static GetBreaksAndDiveRecursively(breakFrom: number, config: UiConfig, boxes: Dimension[], graph: FixedSizeGraph<BadnessDefinition>): FixedSizeGraph<BadnessDefinition> {
        var possibleBreaks = MediaTreeHelperService.GetPossibleBreakIndexes(config, boxes, graph, breakFrom);
        possibleBreaks.forEach(b => 
            graph = MediaTreeHelperService.GetBreaksAndDiveRecursively(b + 1, config, boxes, graph)
        )
        return graph;
    }
    
    static GetPossibleBreakIndexes(config: UiConfig, boxes: Dimension[], graph: FixedSizeGraph<BadnessDefinition>, breakFromIndex: number = 0): number[] {
        var currentWidth = 0;
        var possibleCuts: number[] = [];
        var box:Dimension;
        var foundCuts: boolean = false;

        for (var i=breakFromIndex; i<boxes.length; i++) {
            box = boxes[i];
            currentWidth+= box.w;
            if (currentWidth === config.containerWidth) {
                graph.addEdge(breakFromIndex, i, {badness: 0, height: config.targetHeight})
                possibleCuts.push(i);
                foundCuts = true;
            } else {
                var newHeight = box.h * config.containerWidth / currentWidth;
                if (newHeight >= config.minHeight && newHeight <= config.maxHeight) {
                    graph.addEdge(breakFromIndex, i, {badness: Math.abs(config.targetHeight - newHeight), height: newHeight})
                    possibleCuts.push(i);
                    foundCuts = true;
                } else if (i >= boxes.length - 1 && !foundCuts) {
                    graph.addEdge(breakFromIndex, i, {badness: Math.abs(config.targetHeight - newHeight) * 15, height: config.targetHeight})
                    possibleCuts.push(i);
                }
            }
        }
        return possibleCuts;
    }

}