import { Polygon } from '../src/polygon'
import { Rect } from '../src/rect'
import { Segment } from '../src/segment'
import { Vector } from '../src/vector'

describe('A polygon', () => {
  const pOne = new Vector(0, 0)
  const pTwo = new Vector(200, 0)
  const pThree = new Vector(100, 300)
  const polygon = new Polygon([pOne, pTwo, pThree])

  const segIn = new Segment(new Vector(100, 50), new Vector(100, 10))
  const segIntersec = new Segment(new Vector(100, 50), new Vector(100, -20))
  const segOut = new Segment(new Vector(500, 50), new Vector(500, 10))

  it("can't be constructed with less than three points", () => {
    expect(() => new Polygon([pOne, pTwo])).toThrowError()
  })

  it('has a vertex count', () => {
    expect(polygon.vertexCount).toBe(3)
  })

  it('has sides', () => {
    const [s1, s2, s3] = polygon.sides

    expect(s1).toEqual(new Segment(pOne, pTwo))
    expect(s2).toEqual(new Segment(pTwo, pThree))
    expect(s3).toEqual(new Segment(pThree, pOne))
  })

  it('has a centroid', () => {
    expect(polygon.centroid).toEqual({ x: 100, y: 100 })
  })

  it('has rect bounds (which include a margin of 1 unit)', () => {
    const expectedBounds = new Rect(
      { x: -1, y: -1 },
      { width: 202, height: 302 }
    )
    expect(polygon.rectBounds).toEqual(expectedBounds)
  })

  it("doesn't contain point that's outside the bounds", () => {
    const outsidePoint = { x: 500, y: 700 }
    expect(polygon.containsPoint(outsidePoint)).toBeFalsy()
  })

  it("doesn't contain point inside bounds but outside polygon", () => {
    const outsidePoint = { x: 190, y: 290 }
    expect(polygon.containsPoint(outsidePoint)).toBeFalsy()
  })

  it('contains inside point', () => {
    const insidePoint = { x: 100, y: 50 }
    expect(polygon.containsPoint(insidePoint)).toBeTruthy()
  })

  it('contains any of its vertices', () => {
    const [a, b, c, d] = [
      Vector.origin,
      new Vector(0, 300),
      new Vector(100, 200),
      new Vector(200, 0)
    ]
    const poly = new Polygon([a, b, c, d])

    expect(poly.containsPoint(a)).toBeTruthy()
    expect(poly.containsPoint(b)).toBeTruthy()
    expect(poly.containsPoint(c)).toBeTruthy()
    expect(poly.containsPoint(d)).toBeTruthy()
  })

  describe('intersection with segment', () => {
    it('is false for a segment outside the polygon', () => {
      expect(polygon.hasIntersectionWithSegment(segOut)).toBeFalsy()
    })

    it('computes intersection with segment outside the polygon', () => {
      expect(polygon.intersectionWithSegment(segOut)).toMatchObject({
        hasIntersection: false,
        points: []
      })
    })

    it('is false for a segment inside the polygon', () => {
      expect(polygon.hasIntersectionWithSegment(segIn)).toBeFalsy()
    })

    it('computes intersection with segment inside the polygon', () => {
      expect(polygon.intersectionWithSegment(segIn)).toMatchObject({
        hasIntersection: false,
        points: []
      })
    })

    it('is true for a segment intersecting the polygon', () => {
      expect(polygon.hasIntersectionWithSegment(segIntersec)).toBeTruthy()
    })

    it('computes intersection with segment intersecting the polygon', () => {
      expect(polygon.intersectionWithSegment(segIntersec)).toMatchObject({
        hasIntersection: true,
        points: [{ x: 100, y: 0 }]
      })
    })
  })

  describe('contains segment partially', () => {
    it('segment inside the polygon -> YES', () => {
      const { partially } = polygon.containsSegment(segIn)
      expect(partially).toBeTruthy()
    })

    it('segment that intersects the polygon -> YES', () => {
      const { partially } = polygon.containsSegment(segIntersec)
      expect(partially).toBeTruthy()
    })

    it('segment outside the polygon -> NO', () => {
      const { partially } = polygon.containsSegment(segOut)
      expect(partially).toBeFalsy()
    })
  })

  describe('contains segment completely', () => {
    it('segment inside the polygon -> YES', () => {
      const { completely } = polygon.containsSegment(segIn)
      expect(completely).toBeTruthy()
    })

    it('segment that intersects the polygon -> NO', () => {
      const { completely } = polygon.containsSegment(segIntersec)
      expect(completely).toBeFalsy()
    })

    it('segment outside the polygon -> NO', () => {
      const { completely } = polygon.containsSegment(segOut)
      expect(completely).toBeFalsy()
    })
  })
})
