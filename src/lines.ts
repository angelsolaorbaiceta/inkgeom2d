import Line from './line'
import Vector from './vector'
import vectors from './vectors'
import Projectable from './projectable'

const lines = {
  makeVertical(x: number): Line {
    return new Line(new Vector(x, 0), vectors.vVersor)
  },

  makeHorizontal(y: number): Line {
    return new Line(new Vector(0, y), vectors.uVersor)
  },

  makeBetween(start: Projectable, end: Projectable): Line {
    return new Line(
      new Vector(start.x, start.y),
      vectors.makeBetween(start, end)
    )
  }
}

export default lines
