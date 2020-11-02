import Vector from './vector';
import Projectable from './projectable';
export default class Circle {
    readonly center: Vector;
    readonly radius: number;
    constructor(center: Projectable, radius: number);
    containsPoint(p: Projectable): boolean;
    scaled(scale: number): Circle;
}
