import { origin } from '../src/projectable'
import { Vector } from '../src/vector'
import { vectors } from '../src/vectors'

describe('Vectors', () => {
  describe('factories', () => {
    const base = new Vector(1, 2)
    const direction = new Vector(4, 3)

    it('can create point from base point with direction and length', () => {
      const expected = new Vector(9, 8)
      const actual = vectors
        .startingAt(base)
        .withDirection(direction)
        .andLength(10)

      expect(actual.equals(expected)).toBeTruthy()
    })

    it('can create point from base point with direction and X coord', () => {
      const expected = new Vector(13, 11)
      const actual = vectors
        .startingAt(base)
        .withDirection(direction)
        .andXCoord(13)

      expect(actual.equals(expected)).toBeTruthy()
    })

    it('can create point from base point with direction and Y coord', () => {
      const expected = new Vector(13, 11)
      const actual = vectors
        .startingAt(base)
        .withDirection(direction)
        .andYCoord(11)

      expect(actual.equals(expected)).toBeTruthy()
    })

    it('can create a point middle way between two points', () => {
      const middle = vectors.pointHalfWay(origin, { x: 200, y: 300 })
      expect(middle).toEqual({ x: 100, y: 150 })
    })

    it('can bisect two vectors', () => {
      const bisector = vectors.bisector(Vector.iVersor, Vector.jVersor)
      expect(bisector).toEqual({ x: 1, y: 1 })
    })
  })

  describe('ordering', () => {
    it('with equal x and y coordinates have same order', () => {
      const p = new Vector(1, 3)
      expect(vectors.compare(p, p)).toBe(0)
    })

    it('if x equal, goes before if y is smaller', () => {
      const p = new Vector(1, 3)
      const q = new Vector(1, 5)
      expect(vectors.compare(p, q)).toBeLessThan(0)
    })

    it('if x equal, goes after if y is bigger', () => {
      const p = new Vector(1, 5)
      const q = new Vector(1, 2)
      expect(vectors.compare(p, q)).toBeGreaterThan(0)
    })

    it('goes before if x smaller', () => {
      const p = new Vector(1, 2)
      const q = new Vector(7, 2)
      expect(vectors.compare(p, q)).toBeLessThan(0)
    })

    it('goes after if x greater', () => {
      const p = new Vector(7, 2)
      const q = new Vector(3, 2)
      expect(vectors.compare(p, q)).toBeGreaterThan(0)
    })
  })

  describe('Orthonormalization', () => {
    it('can orthonormalize a base which is already ortnohormal', () => {
      const v1 = new Vector(1, 0)
      const v2 = new Vector(0, 1)
      const [e1, e2] = vectors.orthonormalizeBase(v1, v2)

      expect(e1.equals(v1)).toBeTruthy()
      expect(e2.equals(v2)).toBeTruthy()
    })

    it('can orthonormalize base', () => {
      const v1 = new Vector(3, 1)
      const v2 = new Vector(2, 2)
      const [e1, e2] = vectors.orthonormalizeBase(v1, v2)

      const sqrt10 = Math.sqrt(10)
      const expectedE1 = new Vector(3 / sqrt10, 1 / sqrt10)
      const expectedE2 = new Vector(-1 / sqrt10, 3 / sqrt10)

      expect(e1.equals(expectedE1)).toBeTruthy()
      expect(e2.equals(expectedE2)).toBeTruthy()
    })
  })

  describe('divide in integer parts', () => {
    const vec = new Vector(3.25, 6.67)

    it('fails for less than one division', () => {
      expect(() => vectors.divideInIntegerParts(vec, 0)).toThrowError(
        /positive number/
      )
    })

    it('fails for non integer divisions', () => {
      expect(() => vectors.divideInIntegerParts(vec, 4.5)).toThrowError(
        /integer number/
      )
    })

    it('uses divisions - 1 integer parts', () => {
      const parts = vectors.divideInIntegerParts(vec, 3)
      expect(parts.slice(0, 2)).toEqual([new Vector(1, 2), new Vector(1, 2)])
    })

    it('includes the non-integer part in the last position', () => {
      const parts = vectors.divideInIntegerParts(vec, 3)
      expect(parts[2]).toEqual(new Vector(1.25, 2.67))
    })
  })
})
