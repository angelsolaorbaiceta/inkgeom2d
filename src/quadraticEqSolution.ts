import { ComplexNumber } from './complexNumber'

export interface RealDualSolution {
  one: number
  two: number
}

export interface RealSingleSolution {
  one: number
}

export interface ComplexSolution {
  one: ComplexNumber
  two: ComplexNumber
}

export type QuadEqSolution =
  | RealSingleSolution
  | RealDualSolution
  | ComplexSolution

export function solutionIsRealDual(
  sol: QuadEqSolution
): sol is RealDualSolution {
  return (
    'one' in sol &&
    typeof sol.one === 'number' &&
    'two' in sol &&
    typeof sol.two === 'number'
  )
}

export function solutionIsRealSingle(
  sol: QuadEqSolution
): sol is RealSingleSolution {
  return 'one' in sol && typeof sol.one === 'number' && !('two' in sol)
}

export function solutionIsComplex(sol: QuadEqSolution): sol is ComplexSolution {
  return (
    'one' in sol &&
    sol.one instanceof ComplexNumber &&
    'two' in sol &&
    sol.two instanceof ComplexNumber
  )
}
