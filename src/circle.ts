import { Vector } from './vector'
import { Projectable } from './projectable'

export class Circle {
  readonly center: Vector
  readonly radius: number

  constructor(center: Projectable, radius: number) {
    this.center = Vector.fromProjectable(center)
    this.radius = radius
  }

  containsPoint(p: Projectable): boolean {
    return this.center.distanceTo(p) < this.radius
  }

  scaled(scale: number): Circle {
    return new Circle(this.center, scale * this.radius)
  }
}
