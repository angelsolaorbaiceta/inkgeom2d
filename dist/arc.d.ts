import Vector from './vector';
import Angle from './angle';
import Segment from './segment';
export default class Arc {
    readonly center: Vector;
    readonly radius: number;
    readonly start: Angle;
    readonly end: Angle;
    readonly startSegment: Segment;
    readonly endSegment: Segment;
    get startPoint(): Vector;
    get endPoint(): Vector;
    get angleFromEndToStart(): Angle;
    get angleFromStartToEnd(): Angle;
    /**
     * Vector normal to the start segment looking towards the outside
     * of the arc.
     */
    get startPointNormalDir(): Vector;
    /**
     * Vector normal to the end segment looking towards the outside
     * of the arc.
     */
    get endPointNormalDir(): Vector;
    constructor(center: Vector, radius: number, start: Angle, end: Angle);
    equals(other: Arc): boolean;
}
