import { lineLineNoIntersection } from '../src/intersection.types'
import { Line } from '../src/line'
import { Vector } from '../src/vector'

describe('A Line', () => {
  it('cannot intersect with another parallel line', () => {
    const direction = new Vector(1, 1)
    const l1 = new Line(new Vector(3, 5), direction)
    const l2 = new Line(new Vector(2, 3), direction)

    expect(l1.intersectionWith(l2)).toEqual(lineLineNoIntersection)
  })

  it('intersects with another line', () => {
    const l1 = new Line(new Vector(50, 0), new Vector(0, 1))
    const l2 = new Line(new Vector(0, 30), new Vector(1, 0))
    const { hasIntersection, point } = l1.intersectionWith(l2)
    const expected = new Vector(50, 30)

    expect(hasIntersection).toBeTruthy()
    expect(point!.equals(expected)).toBeTruthy()
  })

  it('has an x intercept', () => {
    const line = new Line(new Vector(0, 10), new Vector(2, -1))
    expect(line.xIntercept).toEqual(20)
  })

  it('has an y intercept', () => {
    const line = new Line(new Vector(20, 0), new Vector(2, -1))
    expect(line.yIntercept).toEqual(10)
  })

  it('can compute x given a y value', () => {
    const line = new Line(new Vector(20, 0), new Vector(2, -1))
    expect(line.xAtY(0)).toEqual(20)
  })

  it('can compute y given a x value', () => {
    const line = new Line(new Vector(0, 10), new Vector(2, -1))
    expect(line.yAtX(0)).toEqual(10)
  })

  describe('horizontal', () => {
    const line = new Line(new Vector(10, 20), new Vector(1, 0))

    it('is horizontal', () => {
      expect(line.isHorizontal).toBeTruthy()
    })

    it('is not vertical', () => {
      expect(line.isVertical).toBeFalsy()
    })

    it('has no x intercept', () => {
      expect(line.xIntercept).toBeUndefined()
    })

    it('has y intercept', () => {
      expect(line.yIntercept).toEqual(20)
    })

    it("can't compute x given a y value", () => {
      expect(line.xAtY(2)).toBeUndefined()
    })
  })

  describe('vertical', () => {
    const line = new Line(new Vector(10, 20), new Vector(0, 1))

    it('is not horizontal', () => {
      expect(line.isHorizontal).toBeFalsy()
    })

    it('is vertical', () => {
      expect(line.isVertical).toBeTruthy()
    })

    it('has x intercept', () => {
      expect(line.xIntercept).toEqual(10)
    })

    it('has no y intercept', () => {
      expect(line.yIntercept).toBeUndefined()
    })

    it("can't compute y given a x value if the line is vertical", () => {
      expect(line.yAtX(2)).toBeUndefined()
    })
  })
})
