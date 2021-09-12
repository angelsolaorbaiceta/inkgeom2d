import Segment from '../src/segment'
import TParam from '../src/tParam'
import Vector from '../src/vector'
import Line from '../src/line'
import { Quadrant } from '../src/quadrant'

describe('A Segment', () => {
  const start = new Vector(400, 0)
  const end = new Vector(0, 400)
  const segment = new Segment(start, end)

  it('has a start point', () => {
    expect(segment.start).toBe(start)
  })

  it('has an end point', () => {
    expect(segment.end).toBe(end)
  })

  it('has a middle point', () => {
    const expected = new Vector(200, 200)
    expect(segment.middle.equals(expected)).toBeTruthy()
  })

  it('has length', () => {
    expect(segment.length).toBeCloseTo(400 * Math.sqrt(2))
  })

  it('has a direction vector', () => {
    const expected = new Vector(-400, 400)
    expect(segment.directionVector.equals(expected)).toBeTruthy()
  })

  it('has a director versor', () => {
    const value = Math.sqrt(2) / 2
    const expected = new Vector(-value, value)

    expect(segment.directionVersor.equals(expected)).toBeTruthy()
  })

  it('has a normal versor', () => {
    const value = Math.sqrt(2) / 2
    const expected = new Vector(-value, -value)

    expect(segment.normalVersor.equals(expected)).toBeTruthy()
  })

  it('can compute a parallel segment at a distance', () => {
    const distance = 100 / Math.sqrt(2)
    const { start, end } = segment.parallelAtDistance(distance)
    const expectedStart = new Vector(350, -50)
    const expectedEnd = new Vector(-50, 350)

    expect(start.equals(expectedStart)).toBeTruthy()
    expect(end.equals(expectedEnd)).toBeTruthy()
  })

  it('can be split at a given T', () => {
    const middle = new Vector(200, 200)
    const expectedOne = new Segment(segment.start, middle)
    const expectedTwo = new Segment(middle, segment.end)
    const [one, two] = segment.split(TParam.middle)

    expect(one.equals(expectedOne)).toBeTruthy()
    expect(two.equals(expectedTwo)).toBeTruthy()
  })

  describe('quadrant', () => {
    it('is on the first quadrant', () => {
      expect(new Segment(Vector.origin, new Vector(100, 100)).quadrant).toBe(
        Quadrant.First
      )
    })

    it('is on the second quadrant', () => {
      expect(new Segment(Vector.origin, new Vector(-100, 100)).quadrant).toBe(
        Quadrant.Second
      )
    })

    it('is on the third quadrant', () => {
      expect(new Segment(Vector.origin, new Vector(-100, -100)).quadrant).toBe(
        Quadrant.Third
      )
    })

    it('is on the fourth quadrant', () => {
      expect(new Segment(Vector.origin, new Vector(100, -100)).quadrant).toBe(
        Quadrant.Fourth
      )
    })
  })

  describe('get point', () => {
    it('yields the start point for t = 0', () => {
      const point = segment.pointAt(TParam.min)
      expect(point.equals(start)).toBeTruthy()
    })

    it('yields the middle point for t = 0.5', () => {
      const point = segment.pointAt(TParam.middle)
      expect(point.equals(segment.middle)).toBeTruthy()
    })

    it('yields the end point for t = 1', () => {
      const point = segment.pointAt(TParam.max)
      expect(point.equals(end)).toBeTruthy()
    })
  })

  it('can be flipped', () => {
    const actual = segment.flipped()
    const expected = new Segment(end, start)

    expect(actual).toEqual(expected)
  })

  describe('with ordered points', () => {
    it('should return itself for ordered point version', () => {
      const s = new Segment(new Vector(0, 0), new Vector(200, 200))
      expect(s.withOrderedPoints()).toBe(s)
    })
  })

  describe('with non ordered points', () => {
    it('should return a version of the segment with the points ordered', () => {
      const s = new Segment(new Vector(200, 0), new Vector(0, 0))
      const expected = new Segment(new Vector(0, 0), new Vector(200, 0))

      expect(s.withOrderedPoints()).toEqual(expected)
    })
  })

  describe('closest point', () => {
    it('can be the start point', () => {
      const { point, t } = segment.closestPointTo({ x: 500, y: 20 })

      expect(point).toBe(start)
      expect(t).toEqual(TParam.min)
    })

    it('can be an intermediate point', () => {
      const expected = new Vector(200, 200)
      const { point, t } = segment.closestPointTo({ x: 250, y: 250 })

      expect(point.equals(expected)).toBeTruthy()
      expect(t.value).toBeCloseTo(TParam.middle.value)
    })

    it('can be the end point', () => {
      const { point, t } = segment.closestPointTo({ x: 20, y: 500 })

      expect(point).toBe(end)
      expect(t).toEqual(TParam.max)
    })
  })

  describe('distance to point', () => {
    it('yields distance to the start point', () => {
      const expected = 100 * Math.sqrt(2)
      const distance = segment.distanceToPoint({ x: 500, y: 100 })
      expect(distance).toBeCloseTo(expected)
    })

    it('yields distance to the intermediate point', () => {
      const expected = 50 * Math.sqrt(2)
      const distance = segment.distanceToPoint({ x: 250, y: 250 })
      expect(distance).toBeCloseTo(expected)
    })

    it('yields distance to the end point', () => {
      const distance = segment.distanceToPoint({ x: 0, y: 500 })
      expect(distance).toBeCloseTo(100)
    })
  })

  describe('is point inside', () => {
    it('a point not aligned is outside', () => {
      const result = segment.containsPoint({ x: 0, y: 0 })
      expect(result).toMatchObject({ contains: false })
    })

    it('a point aligned but before the start point is outside', () => {
      const result = segment.containsPoint({ x: 500, y: -100 })
      expect(result).toMatchObject({ contains: false })
    })

    it('a point aligned but after the end point is outside', () => {
      const result = segment.containsPoint({ x: -100, y: 500 })
      expect(result).toMatchObject({ contains: false })
    })

    it('contains point', () => {
      const result = segment.containsPoint({
        x: 200.00000001,
        y: 200.00000001
      })
      expect(result).toMatchObject({
        contains: true,
        t: TParam.middle,
        point: { x: 200, y: 200 }
      })
    })
  })

  describe('intersection with another segment', () => {
    it('no intersection with parallel segment', () => {
      const other = new Segment(new Vector(0, 100), new Vector(100, 0))
      const result = segment.intersectionWithSegment(other)

      expect(result).toMatchObject({ hasIntersection: false })
    })

    it('no intersection with non parallel segment', () => {
      const other = new Segment(new Vector(550, 550), new Vector(400, 400))
      const result = segment.intersectionWithSegment(other)

      expect(result).toMatchObject({ hasIntersection: false })
    })

    it('intersection with another segment', () => {
      const other = new Segment(new Vector(100, 100), new Vector(500, 500))
      const result = segment.intersectionWithSegment(other)

      expect(result).toMatchObject({
        hasIntersection: true,
        point: { x: 200, y: 200 },
        t1: TParam.middle,
        t2: TParam.tryMake(0.25)
      })
    })

    describe('intersection with a line', () => {
      it('no intersection with parallel line', () => {
        const line = new Line(new Vector(0, 0), new Vector(1, -1))
        const result = segment.intersectionWithLine(line)

        expect(result).toMatchObject({ hasIntersection: false })
      })

      it('no intersection with non parallel line', () => {
        const line = new Line(new Vector(0, -10), new Vector(1, 0))
        const result = segment.intersectionWithLine(line)

        expect(result).toMatchObject({ hasIntersection: false })
      })

      it('intersection with line', () => {
        const line = new Line(new Vector(0, 0), new Vector(1, 1))
        const result = segment.intersectionWithLine(line)

        expect(result).toMatchObject({
          hasIntersection: true,
          point: { x: 200, y: 200 }
        })
        expect(result.t1?.value).toBeCloseTo(TParam.middle.value)
      })
    })
  })
})
