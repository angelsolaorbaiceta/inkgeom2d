import Line from './line';
import Projectable from './projectable';
import Segment from './segment';
import Size from './size';
import Vector from './vector';
import Polygon from './polygon';
export default class Rect {
    readonly origin: Vector;
    readonly size: Size;
    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly bottom: number;
    get area(): number;
    get perimeter(): number;
    get center(): Projectable;
    get corner(): Projectable;
    static readonly nil: Rect;
    constructor(origin: Projectable, size: Size);
    static make(x: number, y: number, width: number, height: number): Rect;
    containsPoint({ x, y }: Projectable): boolean;
    containsSegment({ start, end }: Segment): boolean;
    intersectionWithLine(line: Line): Vector[];
    intersectionSegmentWithLine(line: Line): Segment | undefined;
    toPolygon(): Polygon;
}
