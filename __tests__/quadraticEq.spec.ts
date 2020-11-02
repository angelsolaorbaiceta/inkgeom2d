import { solveQuadEq } from '../src/quadraticEq'
import {
  solutionIsRealDual,
  solutionIsRealSingle,
  solutionIsComplex
} from '../src/quadraticEqSolution'

describe('Quadratic equation', () => {
  it('with two real solutions', () => {
    const solution = solveQuadEq(1, 3, 2)

    if (solutionIsRealDual(solution)) {
      expect(solution.one).toBe(-1)
      expect(solution.two).toBe(-2)
    } else {
      fail()
    }
  })

  it('with a single solution', () => {
    const solution = solveQuadEq(2, 4, 2)

    if (solutionIsRealSingle(solution)) {
      expect(solution.one).toBe(-1)
    } else {
      fail()
    }
  })

  it('with two complex solutions', () => {
    const solution = solveQuadEq(1, 2, 2)

    if (solutionIsComplex(solution)) {
      expect(solution.one).toMatchObject({ re: -1, im: 1 })
    } else {
      fail()
    }
  })
})
