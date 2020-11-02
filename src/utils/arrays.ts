export function isEmpty(array: unknown[]): boolean {
  return array.length === 0
}

export function range(n: number): number[] {
  return [...Array(n).keys()]
}

export function zip<A, B>(a: A[], b: B[]): Array<[A, B]> {
  if (a.length !== b.length) {
    throw new Error('Arrays should have the same size in order to be zipped')
  }

  return range(a.length).map((i) => [a[i], b[i]])
}

export function zipWith<A, B, C>(
  a: A[],
  b: B[],
  zipFn: (a: A, b: B) => C
): C[] {
  return zip(a, b).map(([a, b]) => zipFn(a, b))
}
