import numbers from './numbers'

const MIN = 0
const MAX = 1
const MIDDLE = 0.5 * (MIN + MAX)

export default class TParam {
  static readonly min = new TParam(MIN)
  static readonly middle = new TParam(MIDDLE)
  static readonly max = new TParam(MAX)

  readonly value: number

  get percentage(): number {
    return (100 * this.value) / MAX
  }

  private constructor(value: number) {
    if (!TParam.isValid(value)) {
      throw new Error(`Expected ${value} to be between ${MIN} and ${MAX}`)
    }

    this.value = value
  }

  static isValid(t: number): boolean {
    return t >= MIN && t <= MAX
  }

  static tryMake(value: number): TParam {
    return new TParam(value)
  }

  static makeValid(value: number): TParam {
    return new TParam(numbers.clamp(value).between(MIN, MAX))
  }

  equals(other: TParam): boolean {
    return numbers.areCloseEnough(this.value, other.value)
  }
}
