import { Vector } from '../src/vector'

describe('Vector', () => {
  const u = new Vector(2, 3)
  const v = new Vector(5, 7)

  it('has x and y coordinates', () => {
    expect(u.x).toBe(2)
    expect(u.y).toBe(3)
  })

  it('has length', () => {
    expect(u.length).toBeCloseTo(Math.sqrt(13))
  })

  it('is unit if its length = 1', () => {
    const v = new Vector(1, 0)
    expect(v.isUnit).toBeTruthy()
  })

  it('is not unit if its length != 1', () => {
    expect(u.isUnit).toBeFalsy()
  })

  it('can be normalized', () => {
    expect(u.normalized().isUnit).toBeTruthy()
  })

  it('computes distance to other vector', () => {
    expect(u.distanceTo(v)).toBe(5)
  })

  it('can be scaled', () => {
    const expected = new Vector(4, 6)
    expect(u.scaledBy(2).equals(expected)).toBeTruthy()
  })

  it('can add another vector', () => {
    const expected = new Vector(7, 10)
    const actual = u.plus(v)
    expect(actual.equals(expected)).toBeTruthy()
  })

  it('can subtract another vector', () => {
    const expected = new Vector(-3, -4)
    const actual = u.minus(v)
    expect(actual.equals(expected)).toBeTruthy()
  })

  it('computes dot product with other vector', () => {
    expect(u.dot(v)).toBe(31)
  })

  it('computes cross product with other vector', () => {
    expect(u.cross(v)).toBe(-1)
  })

  it('is parallel to other vector', () => {
    const u = new Vector(2, 5)
    const v = new Vector(4, 10)
    expect(u.isParallelTo(v)).toBeTruthy()
  })

  it('is not parallel to other vector', () => {
    const u = new Vector(2, 5)
    const v = new Vector(4, 4)
    expect(u.isParallelTo(v)).toBeFalsy()
  })

  it('is perpendicular to other vector', () => {
    const u = new Vector(1, 2)
    const v = new Vector(-2, 1)
    expect(u.isPerpendicularTo(v)).toBeTruthy()
  })

  it('is not perpendicular to other vector', () => {
    const u = new Vector(2, 5)
    const v = new Vector(2, 3)
    expect(u.isPerpendicularTo(v)).toBeFalsy()
  })

  it('can be scaled to have a given length', () => {
    const expectedLength = 15
    expect(u.scaledToLength(expectedLength).length).toBeCloseTo(expectedLength)
  })

  it('can be displaced', () => {
    const expected = new Vector(12, 17)
    expect(u.displaced(v, 2).equals(expected)).toBeTruthy()
  })

  describe('computes angle', () => {
    const u = new Vector(1, 0)

    it('with itself is zero', () => {
      const angle = u.angleTo(u)
      expect(angle.radians).toBeCloseTo(0)
    })

    it('with vector in the same quadrant', () => {
      const v = new Vector(1, 1)
      const angle = u.angleTo(v)
      expect(angle.radians).toBeCloseTo(Math.PI / 4)
    })

    it('with vector one separated by a quadrant', () => {
      const v = new Vector(-1, 1)
      const angle = u.angleTo(v)
      expect(angle.radians).toBeCloseTo(0.75 * Math.PI)
    })

    it('with vector in the opposite quadrant', () => {
      const v = new Vector(-1, -1)
      const angle = u.angleTo(v)
      expect(angle.radians).toBeCloseTo(-0.75 * Math.PI)
    })
  })
})
