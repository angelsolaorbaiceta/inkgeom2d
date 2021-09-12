import { Line } from './line'
import { Projectable } from './projectable'
import { Vector } from './vector'
import { vectors } from './vectors'

export const lines = {
  makeVertical(x: number): Line {
    return new Line(new Vector(x, 0), vectors.vVersor)
  },

  makeHorizontal(y: number): Line {
    return new Line(new Vector(0, y), vectors.uVersor)
  },

  makeBetween(start: Projectable, end: Projectable): Line {
    return new Line(start, vectors.makeBetween(start, end))
  }
} as const
