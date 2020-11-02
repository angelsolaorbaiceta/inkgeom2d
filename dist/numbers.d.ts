declare const _default: {
    areCloseEnough(a: number, b: number, epsilon?: number): boolean;
    isCloseToOne(a: number, epsilon?: number): boolean;
    isCloseToZero(a: number, epsilon?: number): boolean;
    zeroOrNumber(a: number, epsilon?: number): number;
    roundDecimals(number: number, decimals: number): number;
    /**
     * Divides `n` into `divisions - 1` equal and integer parts and an extra number
     * with the remaining, such that:
     *
     *  ```ts
     *  sum(divideInIntegerParts(n, divs)) === n
     * ```
     *
     * @param n
     * @param divisions integer and greater than zero number of divisions
     */
    divideInIntegerParts(n: number, divisions: number): number[];
    clamp(n: number, lower: number, upper: number): number;
};
export default _default;
