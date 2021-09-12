import { Angle } from './angle'

export class ComplexNumber {
  readonly re: number
  readonly im: number

  readonly magnitude: number
  readonly angle: Angle

  constructor(re: number, im: number) {
    this.re = re
    this.im = im
    this.magnitude = Math.sqrt(re ** 2 + im ** 2)
    this.angle = Angle.fromRadians(Math.atan(im / re))
  }
}
