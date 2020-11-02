# InkGeom 2D

A small and fast 2D geometry library.

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

## Line Segments
