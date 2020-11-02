export default interface Projectable {
    readonly x: number;
    readonly y: number;
}
export declare const origin: Projectable;
export declare function roundProjections(p: Projectable): {
    x: number;
    y: number;
};
export declare function distanceBetween(p: Projectable, q: Projectable): number;
