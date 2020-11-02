import Vector from './vector';
import { Quadrant } from './quadrant';
export default class Angle {
    readonly radians: number;
    readonly degrees: number;
    get positiveRadians(): number;
    get positiveDegrees(): number;
    get quadrant(): Quadrant;
    static readonly zero: Angle;
    static readonly piQuar: Angle;
    static readonly piHalf: Angle;
    static readonly minusPiHalf: Angle;
    static readonly pi: Angle;
    static readonly twoPi: Angle;
    private constructor();
    static fromRadians(radians: number): Angle;
    static fromDegrees(degrees: number): Angle;
    opposite(): Angle;
    asVector(): Vector;
    cos(): number;
    sin(): number;
    sign(): number;
    asSequence(steps: number): Angle[];
    plus(other: Angle): Angle;
    equals(other: Angle): boolean;
}
