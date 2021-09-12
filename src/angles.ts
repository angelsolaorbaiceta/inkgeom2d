import { Angle } from './angle'

export const angles = {
  sort(angles: Angle[]): Angle[] {
    return angles.sort((a, b) => a.radians - b.radians)
  }
} as const
