export interface Projectable {
  readonly x: number
  readonly y: number
}

export const origin: Projectable = Object.freeze({
  x: 0,
  y: 0
})

export function roundProjections(p: Projectable) {
  return {
    x: Math.round(p.x),
    y: Math.round(p.y)
  }
}

export function distanceBetween(p: Projectable, q: Projectable): number {
  const dx = p.x - q.x
  const dy = p.y - q.y
  return Math.sqrt(dx * dx + dy * dy)
}
