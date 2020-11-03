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
vectors.startingAt(Vector.origin).withDirection(Vector.iVersor).andLength(50) // { x: 50, y: 0 }
```

## Line Segments
