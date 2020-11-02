import Vector from './vector'
import Angle from './angle'
import Segment from './segment'
import numbers from './numbers'

export default class Arc {
  readonly startSegment: Segment
  readonly endSegment: Segment

  get startPoint(): Vector {
    return this.startSegment.end
  }

  get endPoint(): Vector {
    return this.endSegment.end
  }

  get angleFromEndToStart(): Angle {
    const vStart = this.startSegment.directionVersor
    const vEnd = this.endSegment.directionVersor
    return vEnd.angleTo(vStart)
  }

  get angleFromStartToEnd(): Angle {
    const vStart = this.startSegment.directionVersor
    const vEnd = this.endSegment.directionVersor
    return vStart.angleTo(vEnd)
  }

  /**
   * Vector normal to the start segment looking towards the outside
   * of the arc.
   */
  get startPointNormalDir(): Vector {
    const vStart = this.startSegment.directionVersor
    return vStart.rotated(
      this.angleFromEndToStart.sign() > 0 ? Angle.piHalf : Angle.minusPiHalf
    )
  }

  /**
   * Vector normal to the end segment looking towards the outside
   * of the arc.
   */
  get endPointNormalDir(): Vector {
    const vEnd = this.endSegment.directionVersor
    return vEnd.rotated(
      this.angleFromStartToEnd.sign() > 0 ? Angle.piHalf : Angle.minusPiHalf
    )
  }

  constructor(
    readonly center: Vector,
    readonly radius: number,
    readonly start: Angle,
    readonly end: Angle
  ) {
    const u = start.asVector().scaledToLength(radius)
    const uEnd = center.displaced(u)
    this.startSegment = new Segment(center, uEnd)

    const v = end.asVector().scaledToLength(radius)
    const vEnd = center.displaced(v)
    this.endSegment = new Segment(center, vEnd)
  }

  equals(other: Arc): boolean {
    return (
      this.center.equals(other.center) &&
      numbers.areCloseEnough(this.radius, other.radius) &&
      this.start.equals(other.start) &&
      this.end.equals(other.end)
    )
  }
}
