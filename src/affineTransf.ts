import { Angle } from './angle'
import { Arc } from './arc'
import { Line } from './line'
import numbers from './numbers'
import { Polygon } from './polygon'
import Projectable from './projectable'
import { solveQuadEq } from './quadraticEq'
import { QuadEqSolution } from './quadraticEqSolution'
import { Rect } from './rect'
import { Segment } from './segment'
import Size from './size'
import Vector from './vector'

const DECIMALS = 3

export class AffineTransf {
  public readonly sx: number
  public readonly sy: number
  public readonly shx: number
  public readonly shy: number
  public readonly tx: number
  public readonly ty: number

  get determinant(): number {
    return this.sx * this.sy - this.shx * this.shy
  }

  get netScale(): number {
    return Math.sqrt(Math.abs(this.determinant))
  }

  get translation(): Vector {
    return new Vector(this.tx, this.ty)
  }

  get eigenValues(): QuadEqSolution {
    const b = -(this.sx + this.sy)
    const c = this.sx * this.sy - this.shx * this.shy
    return solveQuadEq(1, b, c)
  }

  get base(): [Vector, Vector] {
    return [new Vector(this.sx, this.shy), new Vector(this.shx, this.sy)]
  }

  get rotatedAngle(): Angle {
    return this.base[0].angleWithHorizontal
  }

  static readonly identity = new AffineTransf()
  static readonly flipY = new AffineTransf(1, -1)

  constructor(sx = 1, sy = 1, tx = 0, ty = 0, shx = 0, shy = 0) {
    this.sx = numbers.zeroOrNumber(sx)
    this.sy = numbers.zeroOrNumber(sy)
    this.tx = numbers.zeroOrNumber(tx)
    this.ty = numbers.zeroOrNumber(ty)
    this.shx = numbers.zeroOrNumber(shx)
    this.shy = numbers.zeroOrNumber(shy)
  }

  applyToPoint({ x, y }: Projectable): Vector {
    return new Vector(
      x * this.sx + y * this.shx + this.tx,
      x * this.shy + y * this.sy + this.ty
    )
  }

  applyToSegment(segment: Segment): Segment {
    return new Segment(
      this.applyToPoint(segment.start),
      this.applyToPoint(segment.end)
    )
  }

  applyToLine(line: Line): Line {
    return new Line(
      this.applyToPoint(line.base),
      this.applyToVector(line.direction)
    )
  }

  applyToVector({ x, y }: Projectable): Vector {
    return new Vector(x * this.sx + y * this.shx, x * this.shy + y * this.sy)
  }

  applyToPolygon(poly: Polygon): Polygon {
    return new Polygon(poly.vertices.map((vertex) => this.applyToPoint(vertex)))
  }

  applyToRect(rect: Rect): Polygon {
    return this.applyToPolygon(rect.toPolygon())
  }

  applyToAngle(angle: Angle): Angle {
    return this.applyToVector(angle.asVector()).asAngle()
  }

  applyToArc(arc: Arc): Arc {
    return new Arc(
      this.applyToPoint(arc.center),
      this.netScale * arc.radius,
      this.applyToAngle(arc.start),
      this.applyToAngle(arc.end)
    )
  }

  applyToSize({ width, height }: Size): Size {
    return Object.freeze({
      width: width * Math.abs(this.sx),
      height: height * Math.abs(this.sy)
    })
  }

  append(other: AffineTransf): AffineTransf {
    return new AffineTransf(
      other.sx * this.sx + other.shx * this.shy,
      other.shy * this.shx + other.sy * this.sy,
      other.sx * this.tx + other.shx * this.ty + other.tx,
      other.shy * this.tx + other.sy * this.ty + other.ty,
      other.sx * this.shx + other.shx * this.sy,
      other.shy * this.sx + other.sy * this.shy
    )
  }

  prepend(other: AffineTransf): AffineTransf {
    return other.append(this)
  }

  inverse(): AffineTransf {
    const denom = this.sx * this.sy - this.shx * this.shy
    return new AffineTransf(
      this.sy / denom,
      this.sx / denom,
      (this.ty * this.shx - this.sy * this.tx) / denom,
      (this.tx * this.shy - this.sx * this.ty) / denom,
      -this.shx / denom,
      -this.shy / denom
    )
  }

  asLinear(): AffineTransf {
    if (numbers.isCloseToZero(this.tx) && numbers.isCloseToZero(this.ty)) {
      return this
    }

    return new AffineTransf(this.sx, this.sy, 0, 0, this.shx, this.shy)
  }

  toSVGMatrix(): string {
    return `matrix(${this.styleOrderedTerms().join(' ')})`
  }

  toSCSSatrix(): string {
    return `matrix(${this.styleOrderedTerms().join(', ')})`
  }

  private styleOrderedTerms(): string[] {
    const sx = this.sx.toFixed(DECIMALS)
    const sy = this.sy.toFixed(DECIMALS)
    const tx = this.tx.toFixed(DECIMALS)
    const ty = this.ty.toFixed(DECIMALS)
    const shx = this.shx.toFixed(DECIMALS)
    const shy = this.shy.toFixed(DECIMALS)

    return [sx, shy, shx, sy, tx, ty]
  }

  equals(other: AffineTransf): boolean {
    return (
      numbers.areCloseEnough(this.sx, other.sx) &&
      numbers.areCloseEnough(this.sy, other.sy) &&
      numbers.areCloseEnough(this.tx, other.tx) &&
      numbers.areCloseEnough(this.ty, other.ty) &&
      numbers.areCloseEnough(this.shx, other.shx) &&
      numbers.areCloseEnough(this.shy, other.shy)
    )
  }
}
