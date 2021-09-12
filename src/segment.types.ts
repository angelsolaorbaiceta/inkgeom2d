import { TParam } from './tParam'
import { Vector } from './vector'

export interface ClosestPointResult {
  readonly point: Vector
  readonly t: TParam
}

export interface ContainsPointResult {
  readonly contains: boolean
  readonly t?: TParam
  readonly point?: Vector
}

export const noContainsPointResult: ContainsPointResult = Object.freeze({
  contains: false
})
