import Vector from './vector';
import TParam from './tParam';
export interface ClosestPointResult {
    readonly point: Vector;
    readonly t: TParam;
}
export interface ContainsPointResult {
    readonly contains: boolean;
    readonly t?: TParam;
    readonly point?: Vector;
}
export declare const noContainsPointResult: ContainsPointResult;
