import Angle from './angle';
import Projectable from './projectable';
export default class Vector implements Projectable {
    private _length;
    readonly x: number;
    readonly y: number;
    static readonly origin: Vector;
    static readonly iVersor: Vector;
    static readonly minusIVersor: Vector;
    static readonly jVersor: Vector;
    static readonly minusJVersor: Vector;
    get length(): number;
    get isUnit(): boolean;
    get isZero(): boolean;
    get angleWithHorizontal(): Angle;
    get angleWithVertical(): Angle;
    constructor(x: number, y: number);
    static withRoundCoords(x: number, y: number): Vector;
    static fromProjectable(p: Projectable): Vector;
    normalized(): Vector;
    distanceTo(other: Projectable): number;
    displaced(vector: Vector, times?: number): Vector;
    scaledBy(factor: number): Vector;
    scaledToLength(length: number): Vector;
    plus(addend: Vector): Vector;
    minus(subtrahend: Vector): Vector;
    dot(multiplier: Vector): number;
    cross(multiplier: Vector): number;
    isParallelTo(other: Vector): boolean;
    isPerpendicularTo(other: Vector): boolean;
    angleTo(other: Vector): Angle;
    perpendicular(): Vector;
    opposite(): Vector;
    roundedCoords(): Vector;
    projectedOver(direction: Vector): number;
    asAngle(): Angle;
    rotated(angle: Angle): Vector;
    equals({ x, y }: Projectable): boolean;
}
