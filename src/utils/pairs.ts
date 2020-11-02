export function makeRoundPairs<T>(elements: T[]): T[][] {
  const size = elements.length
  const pairs = []

  for (let i = 0; i < size; i++) {
    pairs.push([elements[i], elements[(i + 1) % size]])
  }

  return pairs
}

function makePairs<T>(elements: T[]): T[][] {
  const size = elements.length
  const pairs = []

  for (let i = 0; i < size - 1; i++) {
    pairs.push([elements[i], elements[i + 1]])
  }

  return pairs
}
