import numbers from './numbers'
import Angle from './angle'
import Projectable, { distanceBetween } from './projectable'

export default class Vector implements Projectable {
  private _length: number | undefined

  readonly x: number
  readonly y: number

  static readonly origin = new Vector(0, 0)
  static readonly iVersor = new Vector(1, 0)
  static readonly minusIVersor = new Vector(-1, 0)
  static readonly jVersor = new Vector(0, 1)
  static readonly minusJVersor = new Vector(0, -1)

  /* <-- PROPERTIES --> */

  get length(): number {
    if (!this._length) {
      this._length = Math.sqrt(this.x * this.x + this.y * this.y)
    }

    return this._length
  }

  get isUnit(): boolean {
    return numbers.isCloseToOne(this.length)
  }

  get isZero(): boolean {
    return numbers.isCloseToZero(this.length)
  }

  get angleWithHorizontal(): Angle {
    return Vector.iVersor.angleTo(this)
  }

  get angleWithVertical(): Angle {
    return Vector.jVersor.angleTo(this)
  }

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  static withRoundCoords(x: number, y: number): Vector {
    return new Vector(Math.round(x), Math.round(y))
  }

  static fromProjectable(p: Projectable): Vector {
    if (p instanceof Vector) return p
    return new Vector(p.x, p.y)
  }

  normalized(): Vector {
    if (this.isUnit) return this

    const length = this.length
    return new Vector(this.x / length, this.y / length)
  }

  distanceTo(other: Projectable): number {
    return distanceBetween(this, other)
  }

  displaced(vector: Vector, times = 1): Vector {
    const scaledVector = vector.scaledBy(times)
    return this.plus(scaledVector)
  }

  scaledBy(factor: number): Vector {
    return new Vector(factor * this.x, factor * this.y)
  }

  scaledToLength(length: number): Vector {
    return this.normalized().scaledBy(length)
  }

  plus(addend: Vector): Vector {
    return new Vector(this.x + addend.x, this.y + addend.y)
  }

  minus(subtrahend: Vector): Vector {
    return new Vector(this.x - subtrahend.x, this.y - subtrahend.y)
  }

  dot(multiplier: Vector): number {
    return this.x * multiplier.x + this.y * multiplier.y
  }

  cross(multiplier: Vector): number {
    return this.x * multiplier.y - this.y * multiplier.x
  }

  isParallelTo(other: Vector): boolean {
    return numbers.isCloseToZero(this.cross(other))
  }

  isPerpendicularTo(other: Vector): boolean {
    return numbers.isCloseToZero(this.dot(other))
  }

  angleTo(other: Vector): Angle {
    const value = Math.acos(this.dot(other) / (this.length * other.length))
    const sign = Math.sign(this.cross(other))
    return Angle.fromRadians(sign * value)
  }

  perpendicular() {
    return new Vector(-this.y, this.x)
  }

  opposite() {
    return new Vector(-this.x, -this.y)
  }

  roundedCoords(): Vector {
    return Vector.withRoundCoords(this.x, this.y)
  }

  projectedOver(direction: Vector): number {
    return this.dot(direction.normalized())
  }

  asAngle(): Angle {
    return this.angleWithHorizontal
  }

  rotated(angle: Angle): Vector {
    const cos = angle.cos()
    const sin = angle.sin()

    return new Vector(this.x * cos - this.y * sin, this.x * sin - this.y * cos)
  }

  equals({ x, y }: Projectable): boolean {
    return (
      numbers.areCloseEnough(this.x, x) && numbers.areCloseEnough(this.y, y)
    )
  }
}
