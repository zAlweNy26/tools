[Overview](../index.md) / TSNE

# TSNE

Implementation of the t-Distributed Stochastic Neighbor Embedding (t-SNE) algorithm.

## Example

```ts
import { TSNE } from '@danyalwe/tools'

const data = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
const tsne = new TSNE(data, { perplexity: 30, epsilon: 10, dimensionality: 2 })
const projection = tsne.transform()

projection.forEach(row => console.log(row)) // 2D coordinates
```

## Constructors

### Constructor

> **new TSNE**(`data`, `params?`): `TSNE`

t-SNE algorithm for dimensionality reduction.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Matrix`](Matrix.md) \| `number`[][] | A 2D array or matrix whose dimensionality is to be reduced. |
| `params?` | `Partial`\<[`TSNEParams`](../interfaces/TSNEParams.md)\> | Optional parameters for the algorithm. |

#### Returns

`TSNE`

#### Overrides

`DimRed<TSNEParams>.constructor`

## Accessors

### dimensionality

#### Get Signature

> **get** **dimensionality**(): `number`

Gets the dimensionality of the data after dimensionality reduction.

##### Returns

`number`

#### Inherited from

`DimRed.dimensionality`

***

### metric

#### Get Signature

> **get** **metric**(): `string`

Gets the metric used for calculating distances between data points.

##### Returns

`string`

#### Inherited from

`DimRed.metric`

***

### parameters

#### Get Signature

> **get** **parameters**(): `Omit`\<`P` & [`DimRedParams`](../interfaces/DimRedParams.md), `"dimensionality"` \| `"metric"` \| `"seed"`\>

Gets the parameters used for the algorithm.

##### Returns

`Omit`\<`P` & [`DimRedParams`](../interfaces/DimRedParams.md), `"dimensionality"` \| `"metric"` \| `"seed"`\>

#### Inherited from

`DimRed.parameters`

***

### seed

#### Get Signature

> **get** **seed**(): `number`

Gets the seed used for generating random numbers.

##### Returns

`number`

#### Inherited from

`DimRed.seed`

## Methods

### generator()

> **generator**(`iterations?`): `Generator`\<[`Matrix`](Matrix.md), [`Matrix`](Matrix.md), `unknown`\>

A generator function that yields the projection of the data after each iteration.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `iterations` | `number` | `500` | The number of iterations to perform. Default to 500. |

#### Returns

`Generator`\<[`Matrix`](Matrix.md), [`Matrix`](Matrix.md), `unknown`\>

The projection of the data after dimensionality reduction.

#### Yields

The projection of the data after each iteration.

#### Example

```ts
const tsne = new TSNE([[1, 2], [3, 4], [5, 6], [7, 8]])
const gen = tsne.generator(200)
for (const intermediate of gen) {
  // intermediate is the projection at each iteration
  console.log(intermediate.rows)
}
```

#### Inherited from

`DimRed.generator`

***

### init()

> **init**(): `TSNE`

Initializes the t-SNE algorithm by computing pairwise distances between data points and
computing probabilities for each pair of points. It also initializes the step and gains matrices.

#### Returns

`TSNE`

The t-SNE instance.

#### Example

```ts
import { Matrix } from '@danyalwe/tools'

// Using precomputed distances
const distances = new Matrix(3, 3, [
  [0, 1, 4],
  [1, 0, 2],
  [4, 2, 0],
])
const tsne = new TSNE(distances, { metric: 'precomputed', perplexity: 2 })
const projection = tsne.transform()
```

#### Overrides

`DimRed.init`

***

### transform()

> **transform**(`iterations?`): [`Matrix`](Matrix.md)

Transforms the data by performing dimensionality reduction on it.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `iterations` | `number` | `500` | The number of iterations to perform. Default to 500. |

#### Returns

[`Matrix`](Matrix.md)

The projection of the data after dimensionality reduction.

#### Example

```ts
const tsne = new TSNE([[1, 2], [3, 4], [5, 6], [7, 8]])
const projection = tsne.transform()        // default 500 iterations
const projection2 = tsne.transform(1000)    // custom iterations
```

#### Inherited from

`DimRed.transform`
