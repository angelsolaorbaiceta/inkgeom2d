import Vector from './vector';
import { IntersectionLineLine } from './intersection.types';
export default class Line {
    readonly base: Vector;
    readonly direction: Vector;
    readonly directionVersor: Vector;
    get isHorizontal(): boolean;
    get isVertical(): boolean;
    get yIntercept(): number | undefined;
    get xIntercept(): number | undefined;
    constructor(base: Vector, direction: Vector);
    isParallelTo(other: Line): boolean;
    isPerpendicularTo(other: Line): boolean;
    intersectionWith(other: Line): IntersectionLineLine;
    xAtY(y: number): number | undefined;
    yAtX(x: number): number | undefined;
    equals(other: Line): boolean;
}
