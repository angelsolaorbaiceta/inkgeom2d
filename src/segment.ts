import Vector from './vector'
import vectors from './vectors'
import TParam from './tParam'
import Projectable from './projectable'
import Rect from './rect'
import rects from './rects'
import Circle from './circle'
import {
  ClosestPointResult,
  ContainsPointResult,
  noContainsPointResult
} from './segment.types'
import Line from './line'
import {
  IntersectionSegmentSegment,
  segSegNoIntersection,
  IntesectionSegmentLine
} from './intersection.types'

export default class Segment {
  readonly start: Vector
  readonly end: Vector
  readonly middle: Vector

  readonly length: number
  readonly width: number
  readonly height: number
  readonly directionVector: Vector
  readonly directionVersor: Vector
  readonly normalVersor: Vector

  get rectBounds(): Rect {
    return rects.makeContainingPoints([this.start, this.end])
  }

  get circleBounds(): Circle {
    return new Circle(this.middle, 0.5 * this.length)
  }

  constructor(start: Vector, end: Vector) {
    this.start = start
    this.end = end
    this.middle = new Vector(0.5 * (start.x + end.x), 0.5 * (start.y + end.y))
    this.length = start.distanceTo(end)
    this.width = Math.abs(end.x - start.x)
    this.height = Math.abs(end.y - start.y)
    this.directionVector = vectors.makeBetween(start, end)
    this.directionVersor = vectors.makeUnitBetween(start, end)
    this.normalVersor = this.directionVersor.perpendicular()
  }

  static makeBetween(
    { x: sx, y: sy }: Projectable,
    { x: ex, y: ey }: Projectable
  ): Segment {
    return new Segment(new Vector(sx, sy), new Vector(ex, ey))
  }

  asLine(): Line {
    return new Line(this.start, this.directionVector)
  }

  pointAt(t: TParam): Vector {
    return this.start.displaced(this.directionVector, t.value)
  }

  parallelAtDistance(distance: number): Segment {
    return new Segment(
      this.start.displaced(this.normalVersor, distance),
      this.end.displaced(this.normalVersor, distance)
    )
  }

  withOrderedPoints(): Segment {
    if (vectors.compare(this.start, this.end) <= 0) return this
    else return new Segment(this.end, this.start)
  }

  closestPointTo(point: Projectable): ClosestPointResult {
    const v = vectors.makeBetween(this.start, point)
    const vs = v.projectedOver(this.directionVersor)

    if (vs < 0) {
      return { point: this.start, t: TParam.min }
    }

    if (vs > this.length) {
      return { point: this.end, t: TParam.max }
    }

    return {
      point: this.start.displaced(this.directionVersor, vs),
      t: TParam.tryMake(vs / this.length)
    }
  }

  distanceToPoint(point: Projectable): number {
    const { point: closest } = this.closestPointTo(point)
    return closest.distanceTo(point)
  }

  containsPoint(p: Projectable, maxDistance = 1e-5): ContainsPointResult {
    const { point, t } = this.closestPointTo(p)

    if (point.distanceTo(p) > maxDistance) {
      return noContainsPointResult
    }

    return Object.freeze({ contains: true, t, point })
  }

  equals(other: Segment): boolean {
    return this.start.equals(other.start) && this.end.equals(other.end)
  }

  intersectionWithSegment(other: Segment): IntersectionSegmentSegment {
    const d1 = this.directionVector
    const d2 = other.directionVector

    if (d1.isParallelTo(d2)) {
      return segSegNoIntersection
    }

    const crossProd = d1.cross(d2)
    const delta = other.start.minus(this.start)
    const t1Val = (delta.x * d2.y - delta.y * d2.x) / crossProd
    const t2Val = (delta.x * d1.y - delta.y * d1.x) / crossProd

    if (TParam.isValid(t1Val) && TParam.isValid(t2Val)) {
      const t1 = TParam.tryMake(t1Val)
      const t2 = TParam.tryMake(t2Val)

      return Object.freeze({
        hasIntersection: true,
        point: this.pointAt(t1),
        t1,
        t2
      })
    }

    return segSegNoIntersection
  }

  intersectionWithLine(line: Line): IntesectionSegmentLine {
    const { point } = this.asLine().intersectionWith(line)

    if (!point) return segSegNoIntersection

    const { contains, t } = this.containsPoint(point)

    if (contains && t) {
      return Object.freeze({
        hasIntersection: true,
        point,
        t1: t
      })
    }

    return segSegNoIntersection
  }

  split(t: TParam): [Segment, Segment] {
    const p = this.pointAt(t)
    return [new Segment(this.start, p), new Segment(p, this.end)]
  }
}
