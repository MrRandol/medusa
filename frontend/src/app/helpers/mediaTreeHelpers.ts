import { Injectable } from "@angular/core";
import { Dimension } from "../models/Media";
import { UiConfig } from "../models/UIConfig";
import { BreakDefinition, FixedSizeGraph, GraphNode } from "../models/Graph";

@Injectable({
    providedIn: 'root'
})

export class MediaTreeHelperService {
    
    static GetOptimalPath(graph: FixedSizeGraph<BreakDefinition>): {source: number, target: number, height: number}[] {
        var path = []
        var index = graph.nodes.length - 1;
        while (index > 0) {
            var node = graph.getNodeByIndex(index);
            var bestChoice:GraphNode<BreakDefinition>;
            var newIndex = -1;
            node.nodesFrom.forEach(ni => {
                var sNode = graph.getNodeByIndex(ni);
                if (!bestChoice || bestChoice.value.badness > sNode.value.badness) {
                    bestChoice = sNode;
                    newIndex = ni;
                }
            })

            if (index > 0 && newIndex == -1) {
                console.error("Could not find a path. Exiting");
                return [];
            }
            path.push({source: node.value.sourceIndex, target: node.value.targetIndex, height: node.value.height});
            index = newIndex;
        }
        return path.reverse(); 
    }

    static GenerateFlexLayoutGraph(config: UiConfig, boxes: Dimension[]): FixedSizeGraph<BreakDefinition> {
        var graph = new FixedSizeGraph<BreakDefinition>(boxes.length);

        var ratio = 1;
        var adjustedBoxes: Dimension[] = boxes.map (b => {
            ratio = config.targetHeight / b.h;
            return {
                h: ratio * b.h,
                w: ratio * b.w
            }
        })

        var initalNode = new GraphNode<BreakDefinition>({
            badness: 0,
            height: config.targetHeight,
            sourceIndex: 0, 
            targetIndex: 0
        });
        graph.addNodeAtIndex(0, initalNode);

        graph = MediaTreeHelperService.GetBreaksAndDiveRecursively(0, config, adjustedBoxes, graph);

        return graph;
    }

    static GetBreaksAndDiveRecursively(breakFrom: number, config: UiConfig, boxes: Dimension[], graph: FixedSizeGraph<BreakDefinition>): FixedSizeGraph<BreakDefinition> {
        var originNode = graph.getNodeByIndex(breakFrom);
        var cumulativeBadness = originNode && originNode.value ? originNode.value.badness : 0;
        var breaks = MediaTreeHelperService.GetPossibleBreakIndexes(config, boxes, breakFrom, cumulativeBadness);

        breaks.forEach(b => {
            var node = graph.getNodeByIndex(b.targetIndex);
            if (node) {
                if (node.value.badness > b.badness) {
                    node.value = b;
                }
            } else {
                node = new GraphNode<BreakDefinition>(b);
                graph.addNodeAtIndex(b.targetIndex, node);
            }
            graph.addEdge(b.sourceIndex, b.targetIndex);
            graph = MediaTreeHelperService.GetBreaksAndDiveRecursively(b.targetIndex, config, boxes, graph);
        })
        return graph;
    }
    
    static GetPossibleBreakIndexes(config: UiConfig, boxes: Dimension[], breakFromIndex: number = 0, cumulativeBadness: number): BreakDefinition[] {
        if (breakFromIndex == boxes.length - 1) {
            return [];
        }
        var currentWidth = 0;
        var possibleCuts: BreakDefinition[] = [];
        var box:Dimension;

        for ( var i=breakFromIndex; i<boxes.length; i++) {
            box = boxes[i];
            currentWidth+= box.w;
            if (currentWidth === config.containerWidth) {
                possibleCuts.push({
                    height: config.targetHeight,
                    badness: cumulativeBadness,
                    sourceIndex: breakFromIndex,
                    targetIndex: i
                });
            } else {
                var newHeight = box.h * config.containerWidth / currentWidth;
                if (newHeight >= config.minHeight && newHeight <= config.maxHeight) {
                    possibleCuts.push({
                        height: newHeight,
                        badness: cumulativeBadness + Math.abs(config.targetHeight - newHeight),
                        sourceIndex: breakFromIndex,
                        targetIndex: i
                    });
                } else if (breakFromIndex == boxes.length - 1) {
                    possibleCuts.push({
                        height: config.targetHeight,
                        badness: cumulativeBadness + Math.abs(config.targetHeight - newHeight),
                        sourceIndex: Math.abs(config.containerWidth - currentWidth) * 15, // TODO : config this badness multiplier
                        targetIndex: i
                    });
                }
            }
        }

        return possibleCuts;
    }

}