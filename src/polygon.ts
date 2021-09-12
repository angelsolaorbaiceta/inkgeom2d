import { Angle } from './angle'
import { IntersectionPolygonSegment } from './intersection.types'
import numbers from './numbers'
import Projectable from './projectable'
import { Rect } from './rect'
import { rects } from './rects'
import { Segment } from './segment'
import { isEmpty } from './utils/arrays'
import { makeRoundPairs } from './utils/pairs'
import Vector from './vector'
import vectors from './vectors'

export class Polygon {
  private _sides: Segment[] | undefined
  private _rectBounds: Rect | undefined

  readonly vertices: Vector[]
  readonly vertexCount: number

  get sides(): Segment[] {
    if (!this._sides) {
      this._sides = makeRoundPairs(this.vertices).map(
        ([start, end]) => new Segment(start, end)
      )
    }

    return this._sides
  }

  get rectBounds(): Rect {
    if (!this._rectBounds) {
      this._rectBounds = rects.makeContainingPointsAndMargin(this.vertices, 1)
    }

    return this._rectBounds
  }

  constructor(vertices: Vector[]) {
    if (vertices.length < 3) {
      throw new Error("Can't construct polygon with less than three vectices")
    }

    this.vertices = vertices
    this.vertexCount = vertices.length
  }

  containsPoint(p: Projectable): boolean {
    if (!this.rectBounds.containsPoint(p)) {
      return false
    }

    const vects = this.vertices.map((vertex) => vectors.makeBetween(p, vertex))

    // The point is one of the vertices
    if (vects.some((vec) => vec.isZero)) return true

    const radians = makeRoundPairs(vects)
      .map(([one, two]) => one.angleTo(two))
      .reduce((totalAngle, angle) => totalAngle.plus(angle), Angle.zero).radians

    return numbers.areCloseEnough(Math.abs(radians), Angle.twoPi.radians)
  }

  hasIntersectionWithSegment(segment: Segment): boolean {
    return this.sides.some(
      (side) => side.intersectionWithSegment(segment).hasIntersection
    )
  }

  intersectionWithSegment(segment: Segment): IntersectionPolygonSegment {
    const points = this.sides
      .map((side) => side.intersectionWithSegment(segment))
      .filter((result) => result.hasIntersection && result.point)
      .map((intersectionResult) => intersectionResult.point!)

    return {
      hasIntersection: !isEmpty(points),
      points: points
    }
  }
  containsSegment(segment: Segment): {
    partially: boolean
    completely: boolean
  } {
    const completely =
      this.containsPoint(segment.start) &&
      this.containsPoint(segment.end) &&
      !this.hasIntersectionWithSegment(segment)
    const partially = this.hasIntersectionWithSegment(segment) || completely

    return { partially, completely }
  }
}
