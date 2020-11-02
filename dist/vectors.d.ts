import Projectable from './projectable';
import Vector from './vector';
declare const vectors: {
    uVersor: Vector;
    vVersor: Vector;
    makeBetween(start: Projectable, end: Projectable): Vector;
    makeUnitBetween(start: Projectable, end: Projectable): Vector;
    pointHalfWay(start: Projectable, end: Projectable): Vector;
    bisector(one: Vector, two: Vector): Vector;
    compare(a: Projectable, b: Projectable): number;
    sorted(points: Projectable[]): Projectable[];
    startingAt(base: Vector): {
        withDirection(dir: Vector): {
            andLength(length: number): Vector;
            andXCoord(x: number): Vector;
            andYCoord(y: number): Vector;
        };
    };
    /**
     * Uses the Gram–Schmidt process to orthonormalize a 2D base.
     *
     * @param v1 first column vector in the base
     * @param v2 second column vector in the base
     */
    orthonormalizeBase(v1: Vector, v2: Vector): [Vector, Vector];
    /**
     * Divides vector `vec` into `divisions - 1` equal and integer parts and an extra
     * vector with the remaining, such that:
     *
     *  ```ts
     *  sum(divideInIntegerParts(vec, divs)) === vec
     * ```
     *
     * @param vec
     * @param divisions integer and greater than zero number of divisions
     */
    divideInIntegerParts(vec: Vector, divisions: number): Vector[];
};
export default vectors;
