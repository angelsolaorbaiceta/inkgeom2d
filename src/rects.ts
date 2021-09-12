import Projectable from './projectable'
import { Rect } from './rect'

export const rects = {
  makeContainingPoints(points: Projectable[]): Rect {
    if (points.length < 1) {
      throw new Error("Can't create rect containing less than one point")
    }

    let [minX, maxX] = [points[0].x, points[0].x]
    let [minY, maxY] = [points[0].y, points[0].y]

    points.forEach((point) => {
      minX = Math.min(minX, point.x)
      maxX = Math.max(maxX, point.x)
      minY = Math.min(minY, point.y)
      maxY = Math.max(maxY, point.y)
    })

    return new Rect(
      { x: minX, y: minY },
      { width: maxX - minX, height: maxY - minY }
    )
  },

  makeContainingPointsAndMargin(points: Projectable[], margin: number): Rect {
    const rect = rects.makeContainingPoints(points)
    return new Rect(
      { x: rect.origin.x - margin, y: rect.origin.y - margin },
      {
        width: 2 * margin + rect.size.width,
        height: 2 * margin + rect.size.height
      }
    )
  },

  makeIncludingPoints(rect: Rect, points: Projectable[]): Rect {
    if (rect === Rect.nil) {
      return rects.makeContainingPoints(points)
    }

    return rects.makeContainingPoints([...points, rect.origin, rect.corner])
  },

  makeRectCentered(center: Projectable, width: number, height: number): Rect {
    const origin = { x: center.x - 0.5 * width, y: center.y - 0.5 * height }
    return new Rect(origin, { width, height })
  }
} as const
