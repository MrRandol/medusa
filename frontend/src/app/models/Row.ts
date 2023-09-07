import { Media } from "./Media";

export interface Row {
    medias: Array<Media>;
    height: number;
}

export interface PathSegment {
    source: number;
    target: number;
    height: number;
    badness: number;
}