[Overview](../index.md) / TSNE

# TSNE

Implementation of the t-Distributed Stochastic Neighbor Embedding (t-SNE) algorithm.

## Extends

- [`DimRed`](DimRed.md)\<[`TSNEParams`](../interfaces/TSNEParams.md)\>

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

[`DimRed`](DimRed.md).[`constructor`](DimRed.md#constructor)

## Accessors

### dimensionality

#### Get Signature

> **get** **dimensionality**(): `number`

Gets the dimensionality of the data after dimensionality reduction.

##### Returns

`number`

#### Inherited from

[`DimRed`](DimRed.md).[`dimensionality`](DimRed.md#dimensionality)

***

### metric

#### Get Signature

> **get** **metric**(): `string`

Gets the metric used for calculating distances between data points.

##### Returns

`string`

#### Inherited from

[`DimRed`](DimRed.md).[`metric`](DimRed.md#metric)

***

### parameters

#### Get Signature

> **get** **parameters**(): `Omit`\<`P` & [`DimRedParams`](../interfaces/DimRedParams.md), `"dimensionality"` \| `"metric"` \| `"seed"`\>

Gets the parameters used for the algorithm.

##### Returns

`Omit`\<`P` & [`DimRedParams`](../interfaces/DimRedParams.md), `"dimensionality"` \| `"metric"` \| `"seed"`\>

#### Inherited from

[`DimRed`](DimRed.md).[`parameters`](DimRed.md#parameters)

***

### seed

#### Get Signature

> **get** **seed**(): `number`

Gets the seed used for generating random numbers.

##### Returns

`number`

#### Inherited from

[`DimRed`](DimRed.md).[`seed`](DimRed.md#seed)

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

#### Inherited from

[`DimRed`](DimRed.md).[`generator`](DimRed.md#generator)

***

### init()

> **init**(): `TSNE`

Initializes the t-SNE algorithm by computing pairwise distances between data points and
computing probabilities for each pair of points. It also initializes the step and gains matrices.

#### Returns

`TSNE`

The t-SNE instance.

#### Overrides

[`DimRed`](DimRed.md).[`init`](DimRed.md#init)

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

#### Inherited from

[`DimRed`](DimRed.md).[`transform`](DimRed.md#transform)
