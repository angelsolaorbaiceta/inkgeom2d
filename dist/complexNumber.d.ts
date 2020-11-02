import Angle from './angle';
export declare class ComplexNumber {
    readonly re: number;
    readonly im: number;
    readonly magnitude: number;
    readonly angle: Angle;
    constructor(re: number, im: number);
}
