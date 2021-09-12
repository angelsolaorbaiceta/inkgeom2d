import { Line } from '../src/line'
import { lines } from '../src/lines'
import { Polygon } from '../src/polygon'
import { Rect } from '../src/rect'
import { Segment } from '../src/segment'
import Vector from '../src/vector'

describe('A Rect', () => {
  const rect = Rect.make(2, 4, 10, 20)

  it('has an origin point', () => {
    expect(rect.origin).toMatchObject({ x: 2, y: 4 })
  })

  it('has a size', () => {
    expect(rect.size).toMatchObject({ width: 10, height: 20 })
  })

  it('has a left value', () => {
    expect(rect.left).toBe(2)
  })

  it('has a top value', () => {
    expect(rect.top).toBe(24)
  })

  it('has a right value', () => {
    expect(rect.right).toBe(12)
  })

  it('has a bottom value', () => {
    expect(rect.bottom).toBe(4)
  })

  it('has an area', () => {
    expect(rect.area).toBe(200)
  })

  it('has a perimeter', () => {
    expect(rect.perimeter).toBe(60)
  })

  it('has a center point', () => {
    expect(rect.center).toMatchObject({ x: 7, y: 14 })
  })

  it('can be converted to polygon', () => {
    const expectedPolygon = new Polygon([
      new Vector(2, 4),
      new Vector(12, 4),
      new Vector(12, 24),
      new Vector(2, 24)
    ])

    expect(rect.toPolygon()).toEqual(expectedPolygon)
  })

  it('can create a new rectangle adding a given margin', () => {
    const rect = new Rect({ x: 0, y: 0 }, { width: 30, height: 10 }).withMargin(
      5
    )
    expect(rect).toEqual(new Rect({ x: -5, y: -5 }, { width: 40, height: 20 }))
  })

  describe('contains point', () => {
    it('does not contain a point outside its bounds', () => {
      const outsidePoint = { x: 500, y: 700 }
      expect(rect.containsPoint(outsidePoint)).toBeFalsy()
    })

    it('contains a point inside its bounds', () => {
      const insidePoint = { x: 7, y: 14 }
      expect(rect.containsPoint(insidePoint)).toBeTruthy()
    })
  })

  describe('contains segment', () => {
    it('contains segment whose start and end points are inside', () => {
      const segment = new Segment(new Vector(5, 7), new Vector(7, 14))
      expect(rect.containsSegment(segment)).toBeTruthy()
    })

    it("doesn't contain segment with only the start point inside", () => {
      const segment = new Segment(new Vector(5, 7), new Vector(70, 140))
      expect(rect.containsSegment(segment)).toBeFalsy()
    })

    it("doesn't contain segment with only the end point inside", () => {
      const segment = new Segment(new Vector(50, 70), new Vector(7, 14))
      expect(rect.containsSegment(segment)).toBeFalsy()
    })
  })

  describe('intersection with a line', () => {
    describe('when the line is horizontal', () => {
      it('may have no intersection points', () => {
        const lineBelow = new Line(new Vector(0, 0), new Vector(1, 0))
        const lineAbove = new Line(new Vector(0, 50), new Vector(1, 0))

        expect(rect.intersectionWithLine(lineBelow)).toEqual([])
        expect(rect.intersectionWithLine(lineAbove)).toEqual([])
      })

      it('may have two intersection points', () => {
        const line = new Line(new Vector(0, 10), new Vector(1, 0))
        const [a, b] = rect.intersectionWithLine(line)

        expect(a.equals(new Vector(2, 10))).toBeTruthy()
        expect(b.equals(new Vector(12, 10))).toBeTruthy()
      })
    })

    describe('when the line is vertical', () => {
      it('may have no intersection points', () => {
        const lineLeft = new Line(new Vector(0, 0), new Vector(0, 1))
        const lineRight = new Line(new Vector(50, 0), new Vector(0, 1))

        expect(rect.intersectionWithLine(lineLeft)).toEqual([])
        expect(rect.intersectionWithLine(lineRight)).toEqual([])
      })

      it('may have two intersection points', () => {
        const line = new Line(new Vector(5, 10), new Vector(0, 1))
        const [a, b] = rect.intersectionWithLine(line)

        expect(a.equals(new Vector(5, 4))).toBeTruthy()
        expect(b.equals(new Vector(5, 24))).toBeTruthy()
      })
    })

    it('may have no intersection points', () => {
      const line = new Line(new Vector(15, 4), new Vector(1, 1))
      expect(rect.intersectionWithLine(line)).toEqual([])
    })

    it('may intersect with the bottom and right', () => {
      const line = new Line(new Vector(10, 4), new Vector(1, 1))
      const [a, b] = rect.intersectionWithLine(line)

      expect(a.equals(new Vector(12, 6))).toBeTruthy()
      expect(b.equals(new Vector(10, 4))).toBeTruthy()
    })

    it('may intersect with the bottom and left', () => {
      const bottom = new Vector(4, 4)
      const left = new Vector(2, 6)
      const line = lines.makeBetween(bottom, left)

      const [a, b] = rect.intersectionWithLine(line)

      expect(a.equals(left)).toBeTruthy()
      expect(b.equals(bottom)).toBeTruthy()
    })

    it('may intersect with the top and right', () => {
      const top = new Vector(10, 24)
      const right = new Vector(12, 22)
      const line = lines.makeBetween(top, right)

      const [a, b] = rect.intersectionWithLine(line)

      expect(a.equals(right)).toBeTruthy()
      expect(b.equals(top)).toBeTruthy()
    })

    it('may intersect with the top and left', () => {
      const top = new Vector(4, 24)
      const left = new Vector(2, 22)
      const line = lines.makeBetween(top, left)

      const [a, b] = rect.intersectionWithLine(line)

      expect(a.equals(left)).toBeTruthy()
      expect(b.equals(top)).toBeTruthy()
    })

    it('may intersect with the left and right', () => {
      const right = new Vector(12, 23)
      const left = new Vector(2, 22)
      const line = lines.makeBetween(right, left)

      const [a, b] = rect.intersectionWithLine(line)

      expect(a.equals(left)).toBeTruthy()
      expect(b.equals(right)).toBeTruthy()
    })

    it('may intersect with the bottom and top', () => {
      const top = new Vector(4, 24)
      const bottom = new Vector(3, 4)
      const line = lines.makeBetween(top, bottom)

      const [a, b] = rect.intersectionWithLine(line)

      expect(a.equals(bottom)).toBeTruthy()
      expect(b.equals(top)).toBeTruthy()
    })
  })
})
