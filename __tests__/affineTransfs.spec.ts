import { AffineTransf } from '../src/affineTransf'
import { transforms } from '../src/affineTransfs'
import { Angle } from '../src/angle'
import { Rect } from '../src/rect'
import Vector from '../src/vector'

describe('Affine Transformation factories', () => {
  const origin = Vector.origin
  const center = new Vector(10, 20)

  describe('makeScaling', () => {
    it('can create X scaling centered in the origin', () => {
      const actual = transforms.makeScaling(2, 1, origin)
      const expected = new AffineTransf(2, 1, 0, 0)

      expect(actual.equals(expected)).toBeTruthy()
    })

    it('can create Y scaling centerend in the origin', () => {
      const actual = transforms.makeScaling(1, 3, origin)
      const expected = new AffineTransf(1, 3, 0, 0)

      expect(actual.equals(expected)).toBeTruthy()
    })

    it('can create scaling about a point', () => {
      const actual = transforms.makeScaling(2, 3, center)
      const expected = new AffineTransf(2, 3, -10, -40)

      expect(actual.equals(expected)).toBeTruthy()
    })
  })

  describe('makeRotation', () => {
    const angle = Angle.fromDegrees(90)

    it('can create rotation about origin', () => {
      const actual = transforms.makeRotation(angle, origin)
      const expected = new AffineTransf(0, 0, 0, 0, -1, 1)

      expect(actual.equals(expected)).toBeTruthy()
    })

    it('can create rotation about a point', () => {
      const actual = transforms.makeRotation(angle, center)
      const expected = new AffineTransf(0, 0, 30, 10, -1, 1)

      expect(actual.equals(expected)).toBeTruthy()
    })
  })

  describe('makeToFitRect', () => {
    const fixed = new Rect(origin, { width: 20, height: 10 })

    it('can fit a rectangle with the same ratio inside another one', () => {
      const fit = new Rect(origin, { width: 10, height: 5 })
      const actual = transforms.makeToFitRectInside(fit, fixed)
      const expected = new AffineTransf(2, 2, 0, 0)

      expect(actual.equals(expected)).toBeTruthy()
    })

    it('can fit a rectangle with different ratio inside another one', () => {
      const fit = new Rect(origin, { width: 10, height: 10 })
      const actual = transforms.makeToFitRectInside(fit, fixed)
      const expected = new AffineTransf(1, 1, 5, 0)

      expect(actual.equals(expected)).toBeTruthy()
    })
  })
})
