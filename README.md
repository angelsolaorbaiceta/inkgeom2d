# InkGeom 2D

A small and fast 2D geometry library without external dependencies.

The geometry library behind [InkStructure app](https://www.inkstructure.com/).

## Installation

Install the library using yarn:

```bash
yarn add ink-geom2d
```

or using npm:

```bash
npm install ink-geom2d
```

## Guide Content

- [Numbers](#Numbers)
- [Angles](#Angles)
  - [Operations](<#Angle Operations>)
- [Vectors](#Vectors)
  - [Length & Distance](<#Lengths & Distances>)
  - [Angles, Rotations & Projections](<#Angles, Rotations & Projections>)
  - [Operations](<#Vector Operations>)
  - [Factories & Utilities](<#Vector Factories & Utilities>)
- [Line Segments](<#Line Segments>)
  - [Segment Points](<#Segment Points>)

## Numbers

The _numbers_ module includes functions to work with numbers:

```ts
import { numbers } from 'ink-geom2d'

// Compare two numbers (using the default epsilon = 1E-10)
numbers.areCloseEnough(1.0000001, 1.0000002) // true

// Compare two numbers (using a specific epsilon)
numbers.areCloseEnough(1.0000001, 1.0000002, 1e-3) // false

// Check if a number is close to zero
numbers.isCloseToZero(0.0000000000001) // true

// Check if a number is chose to one
numbers.isCloseToOne(1.0000000000001) // true

// Rounds the number of decimals
numbers.roundDecimals(1.25, 1) // 1.3

// Clamp a given number
numbers.clamp(5).between(1, 10) // 5
numbers.clamp(-5).between(1, 10) // 1
numbers.clamp(50).between(1, 10) // 10
```

## Angles

The `Angle` class can be used to represent angles.
To instantiate an angle use one of its factories as the constructor is private:

```ts
import { Angle } from 'ink-geom2d'

// From radians
const angle = Angle.fromRadians(Math.PI)

// From degrees
const angle = Angle.fromDegrees(180)
```

There are some common angles ready to be used:

```ts
import { Angle } from 'ink-geom2d'

Angle.zero // 0 rad
Angle.piQuar // 𝝅/4 rad
Angle.piHalf // 𝝅/2 rad
Angle.minusPiHalf // -𝝅/2 rad
Angle.pi // 𝝅 rad
Angle.twoPi // 2𝝅 rad
```

### Angle Operations

The `Angle` class includes some useful operations:

```ts
// Get the angle's quadrant
Angle.fromDegrees(30).quadrant // 1
Angle.fromDegrees(120).quadrant // 2
Angle.fromDegrees(210).quadrant // 3
Angle.fromDegrees(300).quadrant // 4

// Get the opposite angle
Angle.fromDegrees(30).opposite() // { radians: -0.524, degrees: -30 }

// Getting the sign
Angle.fromDegrees(30).sign() // 1
Angle.fromDegrees(-30).sign() // -1

// Getting the angle as a vector
Angle.fromDegrees(30).asVector() // { x: 0.866, y: 0.5 }

// Trigonometric functions
const angle = Angle.fromDegrees(30)
angle.sin() // 0.5
angle.cos() // 0.866
angle.tan() // 0.577

// Add and subtract
const angleOne = Angle.fromDegrees(45)
const angleTwo = Angle.fromDegrees(30)
angleOne.plus(angleTwo) // { radians: 1.309, degrees: 75 }
angleOne.minus(angleTwo) // { radians: 0.262, degrees: 15 }
```

## Vectors

The `Vector` class can be used to define both points and vectors:

```ts
import { Vector } from 'ink-geom2d'

// Create a point or vector
const v = new Vector(1, 2)

// Or use predefined common instances
Vector.origin // { x: 0, y: 0 }
Vector.iVersor // { x: 1, y: 0 }
Vector.minusIVersor // { x: -1, y: 0 }
Vector.jVersor // { x: 0, y: 1 }
Vector.minusJVersor // { x: 0, y: -1 }
```

### Lengths & Distances

```ts
const v = new Vector(1, 2)

// The vector's length
v.length // 2.236

// Is it a unit vector? (length == 1)
v.isUnit // false

// Is it a zero vector? (length == 0)
v.isZero // false

// Compute the unit (normalized) version
v.normalized() // { x: 0.447, y: 0.894 }

// Compute a vector with the same direction but different length
v.scaledToLength(10) // { x: 4.472, y: 8.944 }

// Compute the distance to another point
v.distanceTo(new Vector(4, 6)) // 5
```

### Angles, Rotations & Projections

```ts
const v = new Vector(1, 2)

// Angle between the vector and the horizontal axis
v.angleWithHorizontal // { radians: 1.107, degrees: 63.4345 }

// Angle between the vector and the vertical axis
v.angleWithVertical // { radians: -0.464, degrees: -26.565 }

// Angle between the vector and another vector
v.angleTo(new Vector(1, 1)) // { radians: -0.322, degrees: -18.435 }

// Get the vector's angle (same as angleWithHorizontal)
v.asAngle() // { radians: 1.107, degrees: 63.4345 }

// Rotate the vector a given angle
v.rotated(Angle.pi) // { x: -1, y: 2 }

// Projection length of the vector over another vector
v.projectedOver(Vector.iVersor) // 1
```

### Vector Operations

```ts
const u = new Vector(1, 2)
const v = new Vector(2, -1)

// Adding vectors
u.plus(v) // { x: 3, y: 1 }

// Subtracting vectors
u.minus(v) // { x: -1, y: 3 }

// Dot product
u.dot(v) // 0

// Cross product
u.cross(v) // -5

// Displacing a point by a vector a given number of times
u.displaced(v, 3) // { x: 7, y: -1 }

// Parallelism
u.isParallelTo(v) // false

// Perpendicularity
u.isPerpendicularTo(v) // true

// Computing the opposite vector
u.opposite() // { x: -1, y: -2 }

// Computing a perpendicular vector with the same length
u.perpendicular() // { x: -2, y: 1 }
```

### Vector Factories & Utilities

The `Vector` class can also be instantiated using the factory functions in the _vectors_ module:

```ts
import { vectors } from 'ink-geom2d'

const pointA = { x: 1, y: 3 }
const pointB = { x: 5, y: 2 }

// Make a vector between two points
vectors.makeBetween(pointA, pointB) // { x: 4, y: -1 }

// Make a unit vector between two points
vectors.makeUnitBetween(pointA, pointB) // { x: 0.970, y: -0.243 }

// Make a point halfway
vectors.pointHalfWay(pointA, pointB) // { x: 3, y: 2.5 }

// Compute the bisector beteween two vectors
vectors.bisector(Vector.iVersor, Vector.jVersor) // { x: 1, y: 1 }
```

A `Vector` can also be created using the `startingAt` fluent API:

```ts
const direction = new Vector(1, 2)

vectors.startingAt(Vector.origin).withDirection(direction).andLength(50)
// { x: 22.361, y: 44.721 }

vectors.startingAt(Vector.origin).withDirection(direction).andXCoord(8)
// { x: 8, y: 16 }

vectors.startingAt(Vector.origin).withDirection(direction).andYCoord(5)
// { x: 2.5, y: 5 }
```

Two vectors representing a base can be ortonormalized using the Gram-Schmidt process:

```ts
import { vectors } from 'ink-geom2d'

const iVector = new Vector(3, 0)
const jVector = new Vector(1, 5)

vectors.orthonormalizeBase(iVector, jVector)
// [{ x: 1, y: 0 }, { x: 0, y: 1 }]
```

## Line Segments

The `Segment` class represents a straight line segment defined between two points: the start and end points.

```ts
import { Segment } from 'ink-geom2d'

const segment = new Segment({ x: 15, y: 10 }, { x: 20, y: 50 })

// Segment's start point
segment.start // { x: 15, y: 10 }

// Segment's end point
segment.end // { x: 20, y: 50 }

// Segment's middle point
segment.middle // { x: 17.5, y: 30 }

// Segment's Length
segment.length // 40.311

// Segment's width
segment.width // 5

// Segment's height
segment.height // 40

// Segment's direction vector
segment.directionVector // { x: 5, y: 40 }

// Segment's direction versor (unit length)
segment.directionVersor // { x: 0.124, y: 0.992 }

// Segment's normal versor (unit length)
segment.normalVersor // { x: -0.992, y: 0.124 }

// Segment's rectangular bounds
segment.rectBounds
/*
{
  origin: { x: 15, y: 10 },
  size: { width: 5, height: 40 },
  left: 15,
  right: 20,
  bottom: 10,
  top: 50
}
*/

// Segment's circlular bounds
segment.circleBounds
/*
{ 
  center: { x: 17.5, y: 30 }, 
  radius: 20.156
}
*/
```

### Segment Points

```ts
import { Segment, TParam } from 'ink-geom2d'

const segment = new Segment({ x: 0, y: 10 }, { x: 50, y: 10 })

// Segment point at t = 0.75 (0 <= t <= 1>)
segment.pointAt(TParam.makeValid(0.75)) // { x: 37.5, y: 10 }

// Segment's closest point to an external point
segment.closestPointTo({ x: 25, y: 90 })
/*
{ 
  point: { x: 25, y: 10 }, 
  t: { value: 0.5 } 
}
*/

// Segment's distance to an external point
segment.distanceToPoint({ x: 25, y: 90 }) // 80

// Segment contains point?
segment.containsPoint({ x: 30, y: 10 })
/*
{ 
  contains: true, 
  t: { value: 0.6 }, 
  point: { x: 30, y: 10 } 
}
*/
```

### Segment Intersections

```ts
import { Segment, Line } from 'ink-geom2d'

const segOne = new Segment({ x: 0, y: 10 }, { x: 50, y: 10 })
const segTwo = new Segment({ x: 0, y: 0 }, { x: 50, y: 20 })
const line =
  // Intersection between two segments
  segOne.intersectionWithSegment(segTwo)
/*
{
  hasIntersection: true,
  point: { x: 25, y: 10 },
  t1: { value: 0.5 },
  t2: { value: 0.5 }
}
*/
```
