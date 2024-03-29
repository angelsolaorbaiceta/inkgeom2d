const defaultEpsilon = 1e-10

export const numbers = {
  areCloseEnough(
    a: number,
    b: number,
    epsilon: number = defaultEpsilon
  ): boolean {
    return Math.abs(a - b) < epsilon
  },

  isCloseToOne(a: number, epsilon: number = defaultEpsilon): boolean {
    return this.areCloseEnough(a, 1, epsilon)
  },

  isCloseToZero(a: number, epsilon: number = defaultEpsilon): boolean {
    return this.areCloseEnough(a, 0, epsilon)
  },

  zeroOrNumber(a: number, epsilon: number = defaultEpsilon): number {
    return this.isCloseToZero(a, epsilon) ? 0 : a
  },

  roundDecimals(number: number, decimals: number) {
    return +number.toFixed(decimals)
  },

  /**
   * Divides `n` into `divisions - 1` equal and integer parts and an extra number
   * with the remainder, such that:
   *
   *  ```ts
   *  sum(divideInIntegerParts(n, divs)) === n
   * ```
   *
   * @param n
   * @param divisions integer and greater than zero number of divisions
   */
  divideInIntegerParts(n: number, divisions: number): number[] {
    if (divisions < 1) {
      throw new Error(
        `Expected the number of divisions (${divisions}) to be a positive number`
      )
    }

    if (!Number.isInteger(divisions)) {
      throw new Error(
        `Expected the number of divisions (${divisions}) to be an integer number`
      )
    }

    const integerN = Math.floor(n / divisions)
    const last = n - integerN * (divisions - 1)

    return [...Array(divisions - 1).fill(integerN), last]
  },

  clamp(n: number) {
    return {
      between(lower: number, upper: number): number {
        if (n > lower && n < upper) {
          return n
        }

        if (numbers.areCloseEnough(n, lower)) {
          return lower
        }

        return n < lower ? lower : upper
      }
    }
  }
} as const
