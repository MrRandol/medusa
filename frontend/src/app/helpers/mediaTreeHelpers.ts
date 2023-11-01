import { Injectable } from "@angular/core";
import { Dimension } from "../models/Media";
import { sectionConfig } from "../models/UIConfig";
import { BadnessDefinition, FixedSizeGraph, GraphNode } from "../models/Graph";
import { PathSegment } from "../models/Row";
import { environment } from "environment";

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

    static GenerateFlexLayoutGraph(config: sectionConfig, boxes: Dimension[]): FixedSizeGraph<BadnessDefinition> {
        var graph = new FixedSizeGraph<BadnessDefinition>(boxes.length);
        for (var i = 0; i < boxes.length; i++) {
            var node = new GraphNode<BadnessDefinition>(i);
            graph.addNodeAtIndex(i, node);
        }
        var adjustedBoxes: Dimension[] = boxes.map (b => {
            return {
                h: config.targetHeight,
                w: config.targetHeight / b.h * b.w
            }
        })
        graph = MediaTreeHelperService.GetBreaksAndDiveRecursively(0, config, adjustedBoxes, graph);
        return graph;
    }

    static GetBreaksAndDiveRecursively(breakFrom: number, config: sectionConfig, boxes: Dimension[], graph: FixedSizeGraph<BadnessDefinition>): FixedSizeGraph<BadnessDefinition> {
        var possibleBreaks = MediaTreeHelperService.GetPossibleBreakIndexes(config, boxes, graph, breakFrom);

        possibleBreaks.forEach(b => 
            graph = MediaTreeHelperService.GetBreaksAndDiveRecursively(b + 1, config, boxes, graph)
        )
        return graph;
    }
    
    static GetPossibleBreakIndexes(cfg: sectionConfig, boxes: Dimension[], graph: FixedSizeGraph<BadnessDefinition>, breakFromIndex: number = 0): number[] {
        var currentWidth = 0;
        var possibleCuts: number[] = [];
        var box:Dimension;
        var foundCuts: boolean = false;
        var cumulativeGutter = 0;

        for (var i=breakFromIndex; i<boxes.length; i++) {
            box = boxes[i];
            currentWidth += box.w;
            if(i > breakFromIndex)
                cumulativeGutter += environment.gutter_size;

            if (currentWidth + cumulativeGutter === cfg.containerWidth)  {
                graph.addEdge(breakFromIndex, i, {badness: 0, height: cfg.targetHeight})
                possibleCuts.push(i);
                foundCuts = true;
            } else {
                var newHeight = box.h * (cfg.containerWidth - cumulativeGutter) / currentWidth;
                if (newHeight >= cfg.minHeight && newHeight <= cfg.maxHeight) {
                    graph.addEdge(breakFromIndex, i, {badness: Math.abs(cfg.targetHeight - newHeight), height: newHeight})
                    possibleCuts.push(i);
                    foundCuts = true;
                } else if (i >= boxes.length - 1 && !foundCuts) {
                    graph.addEdge(breakFromIndex, i, {badness: Math.abs(cfg.targetHeight - newHeight) * 15, height: cfg.targetHeight})
                    possibleCuts.push(i);
                }
            }
        }
        return possibleCuts;
    }

}