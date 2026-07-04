[Overview](../index.md) / Randomizer

# Randomizer

A Mersenne Twister random number generator.

## Example

```ts
import { Randomizer } from '@danyalwe/tools'

const rng = new Randomizer(42) // seeded for reproducibility
const rng2 = new Randomizer()  // seeded with Date.now()
```

## Constructors

### Constructor

> **new Randomizer**(`seed?`): `Randomizer`

A Mersenne Twister random number generator.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | The seed for the random number generator. If `seed` is `null` then the actual time gets used. |

#### Returns

`Randomizer`

## Accessors

### seed

#### Get Signature

> **get** **seed**(): `number`

Gets the current seed value.

##### Returns

`number`

The current seed value.

#### Set Signature

> **set** **seed**(`seed`): `void`

Setter for the seed property of the Randomizer class.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | The seed value to set. |

##### Returns

`void`

## Methods

### random()

> **random**(): `number`

Generates a random number between 0 (inclusive) and 1 (exclusive).
Uses the randomInt() method to generate a random integer and scales it to a float between 0 and 1.

#### Returns

`number`

A random number between 0 (inclusive) and 1 (exclusive).

***

### randomGauss()

> **randomGauss**(): `number`

Generates a random number using the Box-Muller transform to approximate a Gaussian distribution.

#### Returns

`number`

A random number with a Gaussian distribution.

***

### randomInt()

> **randomInt**(): `number`

Generates a random integer between 0 and MAX_INTEGER.

#### Returns

`number`

A random integer.

***

### samples()

> **samples**(`data`, `n`): `number`[][]

Returns an array of `n` random samples from the given data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Matrix`](Matrix.md) \| `number`[][] | The matrix or 2D array to sample from. |
| `n` | `number` | The number of samples to return. |

#### Returns

`number`[][]

An array of `n` rows from the input data, randomly selected.

#### Throws

An error if `n` is greater than the number of rows in the input data.

***

### random()

> `static` **random**(): `number`

Returns a random number between 0 (inclusive) and 1 (exclusive) generated using the current time as the seed.

#### Returns

`number`

A random number between 0 (inclusive) and 1 (exclusive).

#### Example

```ts
const rng = new Randomizer(123)
rng.random()          // e.g. 0.528... (seeded)
Randomizer.random()   // static shortcut with random seed
```

***

### randomGauss()

> `static` **randomGauss**(): `number`

Returns a random number using the Box-Muller transform to approximate a Gaussian distribution.

#### Returns

`number`

A random number with a Gaussian distribution.

#### Example

```ts
const rng = new Randomizer(42)
rng.randomGauss()          // e.g. 0.134... (seeded)
Randomizer.randomGauss()   // static shortcut
```

***

### randomInt()

> `static` **randomInt**(): `number`

Returns a random integer between 0 and MAX_INTEGER using the current time as the seed.

#### Returns

`number`

A random integer.

#### Example

```ts
const rng = new Randomizer(42)
rng.randomInt()          // seeded instance
Randomizer.randomInt()   // static shortcut with random seed
```

***

### samples()

> `static` **samples**(`data`, `n`): `number`[][]

Returns a random sample of size `n` from the given data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Matrix`](Matrix.md) \| `number`[][] | The data to sample from. |
| `n` | `number` | The size of the sample to return. |

#### Returns

`number`[][]

A random sample of size `n` from the given data.

#### Example

```ts
const rng = new Randomizer(42)
const data = [[1, 2], [3, 4], [5, 6], [7, 8]]
rng.samples(data, 2)          // e.g. [[5, 6], [1, 2]]
Randomizer.samples(data, 2)   // static shortcut
```
