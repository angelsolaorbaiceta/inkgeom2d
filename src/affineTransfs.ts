import { AffineTransf } from './affineTransf'
import { Angle } from './angle'
import { Projectable } from './projectable'
import { Rect } from './rect'
import { zipWith } from './utils/arrays'
import { Vector } from './vector'
import { vectors } from './vectors'

export const transforms = {
  makeTranslation(tx: number, ty: number) {
    return new AffineTransf(1, 1, tx, ty)
  },

  makeScaling(sx: number, sy: number, center: Projectable = Vector.origin) {
    const tx = center.x * (1 - sx)
    const ty = center.y * (1 - sy)
    return new AffineTransf(sx, sy, tx, ty)
  },

  makeRotation(angle: Angle, center: Projectable = Vector.origin) {
    const cos = angle.cos()
    const sin = angle.sin()
    const oneMinusCos = 1 - cos

    return new AffineTransf(
      cos,
      cos,
      center.x * oneMinusCos + center.y * sin,
      center.y * oneMinusCos - center.x * sin,
      -sin,
      sin
    )
  },

  makeToFitRectInside(fit: Rect, fixed: Rect, factor = 1.0): AffineTransf {
    const { x: tx, y: ty } = vectors.makeBetween(fit.center, fixed.center)
    const translation = transforms.makeTranslation(tx, ty)

    const minRatio =
      factor *
      Math.min(
        fixed.size.width / fit.size.width,
        fixed.size.height / fit.size.height
      )
    const scaling = transforms.makeScaling(minRatio, minRatio, fixed.center)

    return translation.append(scaling)
  },

  combineSequences(
    first: AffineTransf[],
    second: AffineTransf[]
  ): AffineTransf[] {
    if (first.length !== second.length) {
      throw new Error('Sequences should have the same length to be combined')
    }

    return zipWith(first, second, (a: AffineTransf, b: AffineTransf) =>
      a.append(b)
    )
  }
} as const
