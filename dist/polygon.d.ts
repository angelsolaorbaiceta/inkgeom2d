import { IntersectionPolygonSegment } from './intersection.types';
import Projectable from './projectable';
import Rect from './rect';
import Segment from './segment';
import Vector from './vector';
export default class Polygon {
    private _sides;
    private _rectBounds;
    readonly vertices: Vector[];
    readonly vertexCount: number;
    get sides(): Segment[];
    get rectBounds(): Rect;
    constructor(vertices: Vector[]);
    containsPoint(p: Projectable): boolean;
    hasIntersectionWithSegment(segment: Segment): boolean;
    intersectionWithSegment(segment: Segment): IntersectionPolygonSegment;
    containsSegment(segment: Segment): {
        partially: boolean;
        completely: boolean;
    };
}
