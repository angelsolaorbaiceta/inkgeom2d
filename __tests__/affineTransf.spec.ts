import { AffineTransf } from '../src/affineTransf'
import { transforms } from '../src/affineTransfs'
import { Angle } from '../src/angle'
import { Arc } from '../src/arc'
import Line from '../src/line'
import lines from '../src/lines'
import { Polygon } from '../src/polygon'
import { origin } from '../src/projectable'
import {
  ComplexSolution,
  RealSingleSolution,
  solutionIsComplex,
  solutionIsRealDual,
  solutionIsRealSingle
} from '../src/quadraticEqSolution'
import { Rect } from '../src/rect'
import Vector from '../src/vector'

describe('An Affine Transformation', () => {
  const point = new Vector(2, 3)
  const transform = new AffineTransf(1, 2, 3, 4, 5, 6)

  it('has a scale in x value', () => {
    const { sx } = transform
    expect(sx).toBe(1)
  })

  it('has a scale in y value', () => {
    const { sy } = transform
    expect(sy).toBe(2)
  })

  it('has a tranlation in x value', () => {
    const { tx } = transform
    expect(tx).toBe(3)
  })

  it('has a tranlation in y value', () => {
    const { ty } = transform
    expect(ty).toBe(4)
  })

  it('has a translation vector associated', () => {
    const expected = new Vector(3, 4)
    expect(transform.translation.equals(expected)).toBeTruthy()
  })

  it('has a shear in x value', () => {
    const { shx } = transform
    expect(shx).toBe(5)
  })

  it('has a shear in y value', () => {
    const { shy } = transform
    expect(shy).toBe(6)
  })

  it('has a determinant', () => {
    expect(transform.determinant).toBe(-28)
  })

  it('has a new scale', () => {
    expect(transform.netScale).toEqual(Math.sqrt(28))
  })

  it('can be applied to a point', () => {
    const expected = new Vector(20, 22)
    const actual = transform.applyToPoint(point)

    expect(actual.equals(expected)).toBeTruthy()
  })

  it('can be applied to a vector', () => {
    const expected = new Vector(17, 18)
    const actual = transform.applyToVector(point)

    expect(actual.equals(expected)).toBeTruthy()
  })

  it('can scale a horizontal line', () => {
    const line = lines.makeHorizontal(10)
    const transfLine = new AffineTransf(2, 3).applyToLine(line)
    const expected = new Line(new Vector(0, 30), new Vector(1, 0))

    expect(transfLine.equals(expected)).toBeTruthy()
  })

  it('can translate a horizontal line', () => {
    const line = lines.makeHorizontal(10)
    const transfLine = new AffineTransf(1, 1, 20, 30).applyToLine(line)
    const expected = new Line(new Vector(20, 40), new Vector(1, 0))

    expect(transfLine.equals(expected)).toBeTruthy()
  })

  it('can be applied to a polygon', () => {
    const polygon = new Polygon([
      new Vector(0, 0),
      new Vector(200, 0),
      new Vector(100, 300)
    ])
    const expectedPolygon = new Polygon([
      new Vector(3, 4),
      new Vector(203, 1204),
      new Vector(1603, 1204)
    ])

    expect(transform.applyToPolygon(polygon)).toEqual(expectedPolygon)
  })

  it('can be applied to a rect', () => {
    const rect = new Rect(origin, { width: 200, height: 100 })
    const expectedPolygon = new Polygon([
      new Vector(3, 4),
      new Vector(203, 1204),
      new Vector(703, 1404),
      new Vector(503, 204)
    ])

    expect(transform.applyToRect(rect)).toEqual(expectedPolygon)
  })

  it('can be applied to a size', () => {
    const size = { width: 200, height: 300 }
    const expectedSize = { width: 200, height: 600 }

    expect(transform.applyToSize(size)).toEqual(expectedSize)
  })

  it('a negative y-scale inverts an angle', () => {
    const t = new AffineTransf(1, -1)
    expect(t.applyToAngle(Angle.piHalf)).toEqual(Angle.minusPiHalf)
  })

  it('can be applied to an arc', () => {
    const t = new AffineTransf(2, -3, 50, 100)
    const arc = new Arc(new Vector(10, 20), 100, Angle.zero, Angle.piHalf)
    const expectedArc = new Arc(
      new Vector(70, 40),
      100 * t.netScale,
      Angle.zero,
      Angle.minusPiHalf
    )

    expect(t.applyToArc(arc).equals(expectedArc)).toBeTruthy()
  })

  it('can rotate a horizontal line', () => {
    const line = lines.makeHorizontal(10)
    const transfLine = transforms
      .makeRotation(Angle.fromDegrees(45), { x: 0, y: 10 })
      .applyToLine(line)
    const expected = new Line(new Vector(0, 10), new Vector(1, 1))

    expect(transfLine.equals(expected)).toBeTruthy()
  })

  it('can be appended another transformation', () => {
    const other = new AffineTransf(6, 5, 4, 3, 2, 1)
    const expected = new AffineTransf(18, 15, 30, 26, 34, 31)
    const actual = transform.append(other)

    expect(actual.equals(expected)).toBeTruthy()
  })

  it('can be prepended to another transformation', () => {
    const other = new AffineTransf(6, 5, 4, 3, 2, 1)
    const expected = new AffineTransf(18, 15, 30, 26, 34, 31)
    const actual = other.prepend(transform)

    expect(actual.equals(expected)).toBeTruthy()
  })

  it('can compute its inverse', () => {
    const expected = new AffineTransf(1, 1, 0, 0, 0, 0)
    const actual = transform.append(transform.inverse())

    expect(actual.equals(expected)).toBeTruthy()
  })

  it('can compute a linear version', () => {
    const expected = new AffineTransf(1, 2, 0, 0, 5, 6)
    const actual = transform.asLinear()

    expect(actual.equals(expected)).toBeTruthy()
  })

  it('can be converted to a SVG matrix', () => {
    const expected = 'matrix(1.000 6.000 5.000 2.000 3.000 4.000)'
    const actual = transform.toSVGMatrix()

    expect(actual).toEqual(expected)
  })

  it('can be converted to a CSS matrix', () => {
    const expected = 'matrix(1.000, 6.000, 5.000, 2.000, 3.000, 4.000)'
    const actual = transform.toSCSSatrix()

    expect(actual).toEqual(expected)
  })

  describe('eigen values and vectors', () => {
    describe('a uniform and pure scale', () => {
      const transf = new AffineTransf(2, 2)

      it('has one real eigenvalue', () => {
        const values = transf.eigenValues

        expect(solutionIsRealSingle(values)).toBeTruthy()
        expect(values as RealSingleSolution).toMatchObject({ one: 2 })
      })

      it('has a base associated', () => {
        const [u, v] = transf.base
        const expectedU = new Vector(2, 0)
        const expectedV = new Vector(0, 2)

        expect(u.equals(expectedU)).toBeTruthy()
        expect(v.equals(expectedV)).toBeTruthy()
      })

      it('has a rotated angle of zero', () => {
        expect(transf.rotatedAngle.degrees).toBeCloseTo(0)
      })
    })

    describe('a non-uniform pure scale', () => {
      const transf = new AffineTransf(2, 4)

      it('has two real eigenvalues', () => {
        const values = transf.eigenValues

        expect(solutionIsRealDual(values)).toBeTruthy()
        expect(values as RealSingleSolution).toMatchObject({ one: 4, two: 2 })
      })

      it('has a base associated', () => {
        const [u, v] = transf.base
        const expectedU = new Vector(2, 0)
        const expectedV = new Vector(0, 4)

        expect(u.equals(expectedU)).toBeTruthy()
        expect(v.equals(expectedV)).toBeTruthy()
      })

      it('has a rotated angle of zero', () => {
        expect(transf.rotatedAngle.degrees).toBeCloseTo(0)
      })
    })

    describe('a pure rotation', () => {
      const angle = 45
      const transf = transforms.makeRotation(Angle.fromDegrees(angle))

      it('has two imaginary eigenvalues', () => {
        const values = transf.eigenValues

        expect(solutionIsComplex(values)).toBeTruthy()

        const { one, two } = values as ComplexSolution
        expect(one.angle.degrees).toBe(angle)
        expect(two.angle.degrees).toBe(-angle)
      })

      it('has a base associated', () => {
        const [u, v] = transf.base
        const expectedU = new Vector(1, 1).normalized()
        const expectedV = new Vector(-1, 1).normalized()

        expect(u.equals(expectedU)).toBeTruthy()
        expect(v.equals(expectedV)).toBeTruthy()
      })

      it('has a rotated angle', () => {
        expect(transf.rotatedAngle.degrees).toBeCloseTo(angle)
      })
    })

    describe('a scale and rotation', () => {
      const scale = new AffineTransf(2, 4)
      const angle = 45
      const rotate = transforms.makeRotation(Angle.fromDegrees(angle))
      const transf = scale.append(rotate)

      it('has two imaginary eigenvalues', () => {
        const values = transf.eigenValues
        // TODO: what are the expected eigenvalues here and why???
        console.log(values)
      })

      it('has a base associated', () => {
        const [u, v] = transf.base
        const expectedU = new Vector(Math.SQRT2, Math.SQRT2)
        const expectedV = new Vector(-Math.sqrt(8), Math.sqrt(8))

        expect(u.equals(expectedU)).toBeTruthy()
        expect(v.equals(expectedV)).toBeTruthy()
      })

      it('has a rotated angle', () => {
        expect(transf.rotatedAngle.degrees).toBeCloseTo(angle)
      })
    })
  })
})
