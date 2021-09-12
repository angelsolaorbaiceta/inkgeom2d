import { Angle } from './angle'

export default {
  sort(angles: Angle[]): Angle[] {
    return angles.sort((a, b) => a.radians - b.radians)
  }
}
