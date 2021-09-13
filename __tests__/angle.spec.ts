import { Angle } from '../src/angle'
import { Quadrant } from '../src/quadrant'

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

  it.each`
    degrees | angle                     | quadrant
    ${0}    | ${Angle.fromDegrees(0)}   | ${Quadrant.First}
    ${30}   | ${Angle.fromDegrees(30)}  | ${Quadrant.First}
    ${90}   | ${Angle.fromDegrees(90)}  | ${Quadrant.Second}
    ${120}  | ${Angle.fromDegrees(120)} | ${Quadrant.Second}
    ${180}  | ${Angle.fromDegrees(180)} | ${Quadrant.Third}
    ${210}  | ${Angle.fromDegrees(210)} | ${Quadrant.Third}
    ${270}  | ${Angle.fromDegrees(270)} | ${Quadrant.Fourth}
    ${300}  | ${Angle.fromDegrees(300)} | ${Quadrant.Fourth}
    ${360}  | ${Angle.fromDegrees(360)} | ${Quadrant.Fourth}
    ${380}  | ${Angle.fromDegrees(380)} | ${Quadrant.First}
  `(
    'an angle of $angle is on the $quadrant quadrant',
    ({ angle, quadrant }) => {
      expect(angle.quadrant).toBe(quadrant)
    }
  )
})
