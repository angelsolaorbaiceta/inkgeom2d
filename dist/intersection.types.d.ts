import Vector from './vector';
import TParam from './tParam';
export interface IntersectionPolygonSegment {
    readonly hasIntersection: boolean;
    readonly points: Vector[];
}
export interface IntersectionLineLine {
    hasIntersection: boolean;
    point?: Vector;
}
export declare const lineLineNoIntersection: IntersectionLineLine;
export interface IntersectionSegmentSegment {
    readonly hasIntersection: boolean;
    readonly point?: Vector;
    readonly t1?: TParam;
    readonly t2?: TParam;
}
export declare type IntesectionSegmentLine = IntersectionSegmentSegment;
export declare const segSegNoIntersection: IntersectionSegmentSegment;
