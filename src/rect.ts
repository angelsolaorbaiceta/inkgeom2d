import Line from './line'
import Projectable, { origin } from './projectable'
import { Segment } from './segment'
import Size, { nilSize } from './size'
import Vector from './vector'
import Polygon from './polygon'

export default class Rect {
  /* <-- DATA --> */
  readonly origin: Vector
  readonly size: Size

  readonly left: number
  readonly right: number
  readonly top: number
  readonly bottom: number

  /* <-- PROPERTIES --> */
  get area(): number {
    return this.size.width * this.size.height
  }

  get perimeter(): number {
    return 2 * (this.size.width + this.size.height)
  }

  get center(): Projectable {
    return {
      x: this.origin.x + 0.5 * this.size.width,
      y: this.origin.y + 0.5 * this.size.height
    }
  }

  get corner(): Projectable {
    return { x: this.right, y: this.bottom }
  }

  /* <-- CONSTANTS --> */
  static readonly nil = new Rect(origin, nilSize)

  /* <-- CONSTRUCTORS --> */
  constructor(origin: Projectable, size: Size) {
    this.origin = Vector.fromProjectable(origin)
    this.size = size

    this.left = origin.x
    this.right = origin.x + size.width
    this.bottom = origin.y
    this.top = origin.y + size.height
  }

  static make(x: number, y: number, width: number, height: number): Rect {
    return new Rect({ x, y }, { width, height })
  }

  /* <-- METHODS --> */
  containsPoint({ x, y }: Projectable): boolean {
    return x > this.left && x < this.right && y > this.bottom && y < this.top
  }

  containsSegment({ start, end }: Segment): boolean {
    return this.containsPoint(start) && this.containsPoint(end)
  }

  intersectionWithLine(line: Line): Vector[] {
    if (line.isHorizontal) {
      const { y } = line.base
      if (y < this.bottom || y > this.top) return []

      return [new Vector(this.left, y), new Vector(this.right, y)]
    }

    if (line.isVertical) {
      const { x } = line.base
      if (x < this.left || x > this.right) return []

      return [new Vector(x, this.bottom), new Vector(x, this.top)]
    }

    const points: Vector[] = []

    const leftY = line.yAtX(this.left)
    if (leftY && leftY > this.bottom && leftY < this.top) {
      points.push(new Vector(this.left, leftY))
    }

    const rightY = line.yAtX(this.right)
    if (rightY && rightY > this.bottom && rightY < this.top) {
      points.push(new Vector(this.right, rightY))
    }

    const bottomX = line.xAtY(this.bottom)
    if (bottomX && bottomX > this.left && bottomX < this.right) {
      points.push(new Vector(bottomX, this.bottom))
    }

    const topX = line.xAtY(this.top)
    if (topX && topX > this.left && topX < this.right) {
      points.push(new Vector(topX, this.top))
    }

    return points
  }

  intersectionSegmentWithLine(line: Line): Segment | undefined {
    const [start, end] = this.intersectionWithLine(line)
    if (!start || !end) return

    return new Segment(start, end)
  }

  toPolygon(): Polygon {
    return new Polygon([
      this.origin,
      new Vector(this.right, this.bottom),
      new Vector(this.right, this.top),
      new Vector(this.left, this.top)
    ])
  }

  withMargin(margin: number): Rect {
    const twoMargins = 2 * margin

    return new Rect(
      { x: this.left - margin, y: this.bottom - margin },
      {
        width: this.size.width + twoMargins,
        height: this.size.height + twoMargins
      }
    )
  }
}
