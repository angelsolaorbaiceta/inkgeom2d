import Angle from '../src/angle'

describe('Angle', () => {
  it('can be constructed from degrees', () => {
    const angle = Angle.fromDegrees(180)
    expect(angle.radians).toBeCloseTo(Math.PI)
    expect(angle.degrees).toBeCloseTo(180)
  })

  it('wraps around 360 degrees', () => {
    const angle = Angle.fromDegrees(400)
    expect(angle.degrees).toBe(40)
  })

  it('can be constructed from radians', () => {
    const angle = Angle.fromRadians(Math.PI)
    expect(angle.radians).toBeCloseTo(Math.PI)
    expect(angle.degrees).toBeCloseTo(180)
  })

  it('wraps around 2 PI radians', () => {
    const angle = Angle.fromRadians(3 * Math.PI)
    expect(angle.radians).toBeCloseTo(Math.PI)
  })

  it('can compute the opposite', () => {
    const angle = Angle.fromDegrees(180)
    expect(angle.opposite().degrees).toBe(-180)
  })

  it('can be turned into a vector', () => {
    const radians = Math.PI / 5
    const angle = Angle.fromRadians(radians)
    const vector = angle.asVector()

    expect(vector.x).toBeCloseTo(Math.cos(radians))
    expect(vector.y).toBeCloseTo(Math.sin(radians))
  })

  it('can get the positive version of the radians value', () => {
    const angle = Angle.fromRadians(-Math.PI / 2)
    expect(angle.positiveRadians).toBeCloseTo(1.5 * Math.PI)
  })

  it('can get the positive version of the degrees value', () => {
    const angle = Angle.fromDegrees(-90)
    expect(angle.positiveDegrees).toBeCloseTo(270)
  })

  it('can be turned into a sequence', () => {
    const angles = Angle.fromDegrees(40).asSequence(2)

    expect(angles[0].degrees).toBe(20)
    expect(angles[1].degrees).toBe(40)
  })

  it('can be added to other angle', () => {
    const one = Angle.fromDegrees(15)
    const two = Angle.fromDegrees(30)

    expect(one.plus(two)).toEqual(Angle.fromDegrees(45))
  })
})
