export default interface Size {
  readonly width: number
  readonly height: number
}

export const nilSize: Size = Object.freeze({
  width: 0,
  height: 0
})
