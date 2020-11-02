import { ComplexNumber } from './complexNumber';
export interface RealDualSolution {
    one: number;
    two: number;
}
export interface RealSingleSolution {
    one: number;
}
export interface ComplexSolution {
    one: ComplexNumber;
    two: ComplexNumber;
}
export declare type QuadEqSolution = RealSingleSolution | RealDualSolution | ComplexSolution;
export declare function solutionIsRealDual(sol: QuadEqSolution): sol is RealDualSolution;
export declare function solutionIsRealSingle(sol: QuadEqSolution): sol is RealSingleSolution;
export declare function solutionIsComplex(sol: QuadEqSolution): sol is ComplexSolution;
