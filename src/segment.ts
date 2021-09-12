import { Quadrant } from 'src'
import { Circle } from './circle'
import {
  IntersectionSegmentSegment,
  IntesectionSegmentLine,
  segSegNoIntersection
} from './intersection.types'
import { Line } from './line'
import { distanceBetween, Projectable } from './projectable'
import { Rect } from './rect'
import { rects } from './rects'
import {
  ClosestPointResult,
  ContainsPointResult,
  noContainsPointResult
} from './segment.types'
import TParam from './tParam'
import { Vector } from './vector'
import { vectors } from './vectors'

export class Segment {
  /** Segmen't start point: point at `t = 0`. */
  readonly start: Vector
  /** Segmen't end point: point at `t = 1`. */
  readonly end: Vector
  /** Segmen't middle point: point at `t = 0.5`. */
  readonly middle: Vector

  /** Segment's length: the distance between the start and end points. */
  readonly length: number
  /** Segment's length horizontal projection. */
  readonly width: number
  /** Segment's length vertical projection. */
  readonly height: number
  /** Vector going from the start to the end point. */
  readonly directionVector: Vector
  /** A normalized version of the `directionVector`. */
  readonly directionVersor: Vector
  /** Versor perpendicular go the `directionVersor`. */
  readonly normalVersor: Vector

  /** Rectangle containing the segment. */
  get rectBounds(): Rect {
    return rects.makeContainingPoints([this.start, this.end])
  }

  /** Circle containing the segment. */
  get circleBounds(): Circle {
    return new Circle(this.middle, 0.5 * this.length)
  }

  /** Returns the segment direction versor angle's quadrant. */
  get quadrant(): Quadrant {
    return this.directionVersor.angleWithHorizontal.quadrant
  }

  constructor(start: Projectable, end: Projectable) {
    this.start = Vector.fromProjectable(start)
    this.end = Vector.fromProjectable(end)
    this.middle = vectors.pointHalfWay(start, end)
    this.length = distanceBetween(start, end)
    this.width = Math.abs(end.x - start.x)
    this.height = Math.abs(end.y - start.y)
    this.directionVector = vectors.makeBetween(start, end)
    this.directionVersor = vectors.makeUnitBetween(start, end)
    this.normalVersor = this.directionVersor.perpendicular()
  }

  /**
   * Creates a `Line` using the segment's start point as its base point and
   * the segment's `directionVector` as the direction.
   *
   * @returns `Line`
   */
  asLine(): Line {
    return new Line(this.start, this.directionVector)
  }

  /**
   * Returns a point in the segment at the given t position.
   *
   * When `t = 0`, it returns the start point. When `t = 1` it returns the
   * end point.
   *
   * @param t T Parameter value
   * @returns `Point` in the segment
   */
  pointAt(t: TParam): Vector {
    return this.start.displaced(this.directionVector, t.value)
  }

  /**
   * Creates a new segment parallel to this one, at a given distance in the
   * `normalVersor` direction.
   *
   * Use a negative distance for a segment on the opposite side.
   *
   * @param distance `number`
   * @returns segment parallel to this one
   */
  parallelAtDistance(distance: number): Segment {
    return new Segment(
      this.start.displaced(this.normalVersor, distance),
      this.end.displaced(this.normalVersor, distance)
    )
  }

  /**
   * Returns a new `Segment` result of swapping the start and end points of
   * this segment.
   *
   * @returns `Segment`
   */
  flipped(): Segment {
    return new Segment(this.end, this.start)
  }

  /**
   * If the start and end points of this segment are already ordered, it returns
   * this segment. If not, the flipped segment with ordered points is returned.
   *
   * @returns `Segment` with ordered points
   */
  withOrderedPoints(): Segment {
    return vectors.compare(this.start, this.end) <= 0 ? this : this.flipped()
  }

  /**
   * Returns the segmen's closest point (and its t position) to a given
   * external point.
   *
   * @param point external point
   * @returns closest point in the segment and its t value
   */
  closestPointTo(point: Projectable): Readonly<ClosestPointResult> {
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

  /**
   * Returns the distance from an external point to the segment's closest point.
   *
   * @param point external point
   * @returns distance to the segment
   */
  distanceToPoint(point: Projectable): number {
    const { point: closest } = this.closestPointTo(point)
    return closest.distanceTo(point)
  }

  /**
   * Returns `true` if the given point is closer to the segment than a given
   * maximum distance.
   *
   * @param p external point
   * @param maxDistance maximum distance allowed
   * @returns whether the point is close enough to the segment
   */
  containsPoint(
    p: Projectable,
    maxDistance = 1e-5
  ): Readonly<ContainsPointResult> {
    const { point, t } = this.closestPointTo(p)

    if (point.distanceTo(p) > maxDistance) {
      return noContainsPointResult
    }

    return { contains: true, t, point }
  }

  /**
   * Computes the intersection of this segment with another one.
   *
   * If an intersection point is found, it retuns it along with the t parameter
   * values that locate the point in both this and the other segment: `t1` and
   * `t2`.
   *
   * @param other `Segment`
   * @returns intersection result
   */
  intersectionWithSegment(
    other: Segment
  ): Readonly<IntersectionSegmentSegment> {
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

      return {
        hasIntersection: true,
        point: this.pointAt(t1),
        t1,
        t2
      }
    }

    return segSegNoIntersection
  }

  /**
   * Computes the intersection between this segment and a line.
   *
   * If an intersection point is found, it retuns it along with the t parameter
   * value that locate the point in this segment.
   *
   * @param line `Line`
   * @returns intersection result
   */
  intersectionWithLine(line: Line): Readonly<IntesectionSegmentLine> {
    const { point } = this.asLine().intersectionWith(line)

    if (!point) return segSegNoIntersection

    const { contains, t } = this.containsPoint(point)

    if (contains && t) {
      return {
        hasIntersection: true,
        point,
        t1: t
      }
    }

    return segSegNoIntersection
  }

  /**
   * Splits this segment in two, at the given t parameter's position.
   *
   * If `t = 0`, the first segment will have a length of zero. Similarly, if
   * `t = 1` the second segment will have a length of zero.
   *
   * @param t split position
   * @returns two segments
   */
  split(t: TParam): [Segment, Segment] {
    const p = this.pointAt(t)
    return [new Segment(this.start, p), new Segment(p, this.end)]
  }

  /**
   * Compares this and other segment. It returns `true` if both have the same
   * start and end points.
   *
   * @param other `Segment`
   * @returns whether the two segments are equal
   */
  equals(other: Segment): boolean {
    return this.start.equals(other.start) && this.end.equals(other.end)
  }
}
