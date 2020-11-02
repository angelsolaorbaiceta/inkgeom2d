import Line from './line'
import lines from './lines'
import numbers from './numbers'
import Projectable from './projectable'
import { zip } from './utils/arrays'
import Vector from './vector'

const vectors = {
  uVersor: new Vector(1, 0),
  vVersor: new Vector(0, 1),

  makeBetween(start: Projectable, end: Projectable): Vector {
    return new Vector(end.x - start.x, end.y - start.y)
  },

  makeUnitBetween(start: Projectable, end: Projectable) {
    return vectors.makeBetween(start, end).normalized()
  },

  pointHalfWay(start: Projectable, end: Projectable): Vector {
    return new Vector(0.5 * (start.x + end.x), 0.5 * (start.y + end.y))
  },

  bisector(one: Vector, two: Vector): Vector {
    return one.normalized().plus(two.normalized())
  },

  compare(a: Projectable, b: Projectable): number {
    if (numbers.areCloseEnough(a.x, b.x)) {
      if (numbers.areCloseEnough(a.y, b.y)) return 0
      return a.y - b.y
    }

    return a.x - b.x
  },

  sorted(points: Projectable[]): Projectable[] {
    return points.sort(vectors.compare)
  },

  startingAt(base: Vector) {
    return {
      withDirection(dir: Vector) {
        return {
          andLength(length: number): Vector {
            const directionVersor = dir.normalized()
            return base.displaced(directionVersor, length)
          },

          andXCoord(x: number): Vector {
            const verticalLine = lines.makeVertical(x)
            const line = new Line(base, dir)
            return line.intersectionWith(verticalLine).point!
          },

          andYCoord(y: number): Vector {
            const horizontalLine = lines.makeHorizontal(y)
            const line = new Line(base, dir)
            return line.intersectionWith(horizontalLine).point!
          }
        }
      }
    }
  },

  /**
   * Uses the Gram–Schmidt process to orthonormalize a 2D base.
   *
   * @param v1 first column vector in the base
   * @param v2 second column vector in the base
   */
  orthonormalizeBase(v1: Vector, v2: Vector): [Vector, Vector] {
    const projection = v1.scaledToLength(v2.projectedOver(v1))
    const u2 = v2.minus(projection)

    return [v1.normalized(), u2.normalized()]
  },

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
  divideInIntegerParts(vec: Vector, divisions: number): Vector[] {
    const xDivs = numbers.divideInIntegerParts(vec.x, divisions)
    const yDivs = numbers.divideInIntegerParts(vec.y, divisions)

    return zip(xDivs, yDivs).map(([x, y]) => new Vector(x ?? 0, y ?? 0))
  }
}

export default vectors
