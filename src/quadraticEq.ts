import { ComplexNumber } from './complexNumber'
import { QuadEqSolution } from './quadraticEqSolution'

export function solveQuadEq(a: number, b: number, c: number): QuadEqSolution {
  const b24ac = b ** 2 - 4 * a * c
  const twoA = 2 * a

  if (b24ac > 0) {
    const sqr = Math.sqrt(b24ac)

    return {
      one: (-b + sqr) / twoA,
      two: (-b - sqr) / twoA
    }
  }

  if (b24ac < 0) {
    const re = -b / twoA
    const im = Math.sqrt(-b24ac) / twoA

    return {
      one: new ComplexNumber(re, im),
      two: new ComplexNumber(re, -im)
    }
  }

  return {
    one: -b / twoA
  }
}
