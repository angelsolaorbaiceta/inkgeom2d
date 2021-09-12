import { Vector } from './vector'
import TParam from './tParam'

/* <-- POLYGON & SEGMENT --> */
export interface IntersectionPolygonSegment {
  readonly hasIntersection: boolean
  readonly points: Vector[]
}

/* <-- LINE & LINE --> */
export interface IntersectionLineLine {
  hasIntersection: boolean
  point?: Vector
}

export const lineLineNoIntersection: IntersectionLineLine = Object.freeze({
  hasIntersection: false
})

/* <-- SEGMENT & SEGMENT / LINE --> */
export interface IntersectionSegmentSegment {
  readonly hasIntersection: boolean
  readonly point?: Vector
  readonly t1?: TParam
  readonly t2?: TParam
}

export type IntesectionSegmentLine = IntersectionSegmentSegment

export const segSegNoIntersection: Readonly<IntersectionSegmentSegment> =
  Object.freeze({
    hasIntersection: false
  })
