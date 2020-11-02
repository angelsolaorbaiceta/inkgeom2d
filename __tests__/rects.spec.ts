import Rect from '../src/rect'
import rects from '../src/rects'

describe('Rectangle factories', () => {
  const p = { x: 0, y: 5 }
  const q = { x: 10, y: 0 }
  const r = { x: 5, y: 7 }

  it("can't create rect from less than one point", () => {
    expect(() => rects.makeContainingPoints([])).toThrowError()
  })

  it('can create rect containing points', () => {
    const expected = new Rect({ x: 0, y: 0 }, { width: 10, height: 7 })
    const actual = rects.makeContainingPoints([p, q, r])

    expect(actual).toEqual(expected)
  })

  it('can create rect containing points and with margin', () => {
    const expected = new Rect({ x: -1, y: -1 }, { width: 12, height: 9 })
    const actual = rects.makeContainingPointsAndMargin([p, q, r], 1)

    expect(actual).toEqual(expected)
  })

  it('can create rect including points', () => {
    const expected = new Rect({ x: 0, y: 0 }, { width: 10, height: 7 })
    const original = rects.makeContainingPoints([p, q])
    const actual = rects.makeIncludingPoints(original, [r])

    expect(actual).toEqual(expected)
  })

  it('can create rect from nil rect including points', () => {
    const expected = new Rect({ x: 5, y: 0 }, { width: 5, height: 7 })
    const actual = rects.makeIncludingPoints(Rect.nil, [q, r])

    expect(actual).toEqual(expected)
  })

  it('can make rect centered in a point', () => {
    const actual = rects.makeRectCentered({ x: 5, y: 10 }, 20, 40)
    const expected = new Rect({ x: -5, y: -10 }, { width: 20, height: 40 })

    expect(actual).toEqual(expected)
  })
})
