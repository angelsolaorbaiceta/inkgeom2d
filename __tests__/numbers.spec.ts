import numbers from '../src/numbers'

describe('Numbers', () => {
  it('are not close enough given tolerance', () => {
    expect(numbers.areCloseEnough(1, 2, 0.1)).toBeFalsy()
  })

  it('are close enough given tolerance', () => {
    expect(numbers.areCloseEnough(2, 2.0001, 0.1)).toBeTruthy()
  })

  describe('divide in integer parts', () => {
    it('fails for less than one division', () => {
      expect(() => numbers.divideInIntegerParts(10, 0)).toThrowError(
        /positive number/
      )
    })

    it('fails for non integer divisions', () => {
      expect(() => numbers.divideInIntegerParts(10, 4.5)).toThrowError(
        /integer number/
      )
    })

    it('uses divisions - 1 integer parts', () => {
      const parts = numbers.divideInIntegerParts(3.5, 3)
      expect(parts.slice(0, 2)).toEqual([1, 1])
    })

    it('includes the non-integer part in the last position', () => {
      const parts = numbers.divideInIntegerParts(3.5, 3)
      expect(parts[2]).toBe(1.5)
    })

    it('the sum of parts should always match the original number', () => {
      const parts = numbers.divideInIntegerParts(13.25, 9)
      const sum = parts.reduce((sum, n) => sum + n, 0)
      expect(sum).toBe(13.25)
    })
  })

  describe('clamp', () => {})
})
