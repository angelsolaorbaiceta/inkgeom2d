import numbers from './numbers'
import { Quadrant } from './quadrant'
import Vector from './vector'

const TWO_PI = 2 * Math.PI
const PI_QUARTER = 0.25 * Math.PI
const PI_HALF = 0.5 * Math.PI
const THREE_PI_HALF = 1.5 * Math.PI
const MAX_DEG = 360
const MID_DEG = 180

function radiansToDegrees(radians: number): number {
  return (radians * MID_DEG) / Math.PI
}

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

export class Angle {
  readonly radians: number
  readonly degrees: number

  get positiveRadians(): number {
    return this.radians < 0 ? TWO_PI + this.radians : this.radians
  }

  get positiveDegrees(): number {
    return this.degrees < 0 ? MAX_DEG + this.degrees : this.degrees
  }

  get quadrant(): Quadrant {
    const rads = this.positiveRadians

    if (rads >= 0 && rads < PI_HALF) {
      return Quadrant.First
    }

    if (rads >= PI_HALF && rads < Math.PI) {
      return Quadrant.Second
    }

    if (rads >= Math.PI && rads < THREE_PI_HALF) {
      return Quadrant.Third
    }

    return Quadrant.Fourth
  }

  static readonly zero = new Angle(0, 0)
  static readonly piQuar = Angle.fromRadians(PI_QUARTER)
  static readonly piHalf = Angle.fromRadians(PI_HALF)
  static readonly minusPiHalf = Angle.fromRadians(-PI_HALF)
  static readonly pi = Angle.fromRadians(Math.PI)
  static readonly twoPi = Angle.fromRadians(TWO_PI)

  private constructor(radians: number, degrees: number) {
    this.radians = radians
    this.degrees = degrees
  }

  static fromRadians(radians: number): Angle {
    const wrappedRadians = radians > TWO_PI ? radians % TWO_PI : radians
    return new Angle(wrappedRadians, radiansToDegrees(wrappedRadians))
  }

  static fromDegrees(degrees: number): Angle {
    const wrappedDegrees = degrees > MAX_DEG ? degrees % MAX_DEG : degrees
    return new Angle(degreesToRadians(wrappedDegrees), wrappedDegrees)
  }

  opposite(): Angle {
    return new Angle(-this.radians, -this.degrees)
  }

  asVector(): Vector {
    return new Vector(this.cos(), this.sin())
  }

  cos(): number {
    return Math.cos(this.radians)
  }

  sin(): number {
    return Math.sin(this.radians)
  }

  tan(): number {
    return Math.tan(this.radians)
  }

  sign(): number {
    return Math.sign(this.radians)
  }

  asSequence(steps: number): Angle[] {
    const radiansDelta = this.radians / steps
    return Array.from({ length: steps }, (_, i) =>
      Angle.fromRadians(radiansDelta * (i + 1))
    )
  }

  plus(other: Angle): Angle {
    return Angle.fromRadians(this.radians + other.radians)
  }

  minus(other: Angle): Angle {
    return Angle.fromRadians(this.radians - other.radians)
  }

  equals(other: Angle): boolean {
    // TODO: test
    return numbers.areCloseEnough(this.radians % TWO_PI, other.radians % TWO_PI)
  }
}
