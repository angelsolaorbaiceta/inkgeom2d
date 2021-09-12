export interface Size {
  readonly width: number
  readonly height: number
}

export const nilSize: Readonly<Size> = Object.freeze({
  width: 0,
  height: 0
})
