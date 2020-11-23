import {
  IntersectionLineLine,
  lineLineNoIntersection
} from './intersection.types'
import numbers from './numbers'
import Projectable from './projectable'
import Vector from './vector'

export default class Line {
  readonly base: Vector
  readonly direction: Vector
  readonly directionVersor: Vector

  get isHorizontal(): boolean {
    return numbers.isCloseToZero(this.direction.y)
  }

  get isVertical(): boolean {
    return numbers.isCloseToZero(this.direction.x)
  }

  get yIntercept(): number | undefined {
    if (this.isVertical) return undefined

    const { x: bx, y: by } = this.base
    const { x: dx, y: dy } = this.direction

    return by - bx * (dy / dx)
  }

  get xIntercept(): number | undefined {
    if (this.isHorizontal) return undefined

    const { x: bx, y: by } = this.base
    const { x: dx, y: dy } = this.direction

    return bx - by * (dx / dy)
  }

  constructor(base: Projectable, direction: Projectable) {
    this.base = Vector.fromProjectable(base)
    this.direction = Vector.fromProjectable(direction)
    this.directionVersor = this.direction.normalized()
  }

  isParallelTo(other: Line) {
    return this.direction.isParallelTo(other.direction)
  }

  isPerpendicularTo(other: Line) {
    return this.direction.isPerpendicularTo(other.direction)
  }

  intersectionWith(other: Line): IntersectionLineLine {
    if (this.isParallelTo(other)) return lineLineNoIntersection

    const { x: dx, y: dy } = other.direction
    const { x: incX, y: incY } = other.base.minus(this.base)
    const t = (incX * dy - incY * dx) / this.direction.cross(other.direction)

    return Object.freeze({
      hasIntersection: true,
      point: this.base.displaced(this.direction, t)
    })
  }

  xAtY(y: number): number | undefined {
    const xIntercept = this.xIntercept
    if (xIntercept === undefined) return

    const ySlope = this.direction.x / this.direction.y
    return xIntercept + ySlope * y
  }

  yAtX(x: number): number | undefined {
    const yIntercept = this.yIntercept
    if (yIntercept === undefined) return

    const xSlope = this.direction.y / this.direction.x
    return yIntercept + xSlope * x
  }

  equals(other: Line): boolean {
    return (
      this.base.equals(other.base) &&
      this.directionVersor.equals(other.directionVersor)
    )
  }
}
