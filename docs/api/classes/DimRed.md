[Overview](../index.md) / DimRed

# DimRed\<P\>

A class for performing dimensionality reduction on a matrix of data.

## Extended by

- [`TSNE`](TSNE.md)

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `P` *extends* [`DimRedParams`](../interfaces/DimRedParams.md) | The type of the parameters for the class. |

## Constructors

### Constructor

> **new DimRed**\<`P`\>(`data`, `params?`): `DimRed`\<`P`\>

Constructs a new instance of the DimRed class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Matrix`](Matrix.md) \| `number`[][] | The matrix of data to perform dimensionality reduction on. |
| `params?` | `Partial`\<`P`\> | Optional parameters for the algorithm. |

#### Returns

`DimRed`\<`P`\>

## Accessors

### dimensionality

#### Get Signature

> **get** **dimensionality**(): `number`

Gets the dimensionality of the data after dimensionality reduction.

##### Returns

`number`

***

### metric

#### Get Signature

> **get** **metric**(): `string`

Gets the metric used for calculating distances between data points.

##### Returns

`string`

***

### parameters

#### Get Signature

> **get** **parameters**(): `Omit`\<`P` & [`DimRedParams`](../interfaces/DimRedParams.md), `"dimensionality"` \| `"metric"` \| `"seed"`\>

Gets the parameters used for the algorithm.

##### Returns

`Omit`\<`P` & [`DimRedParams`](../interfaces/DimRedParams.md), `"dimensionality"` \| `"metric"` \| `"seed"`\>

***

### seed

#### Get Signature

> **get** **seed**(): `number`

Gets the seed used for generating random numbers.

##### Returns

`number`

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

***

### init()

> `abstract` **init**(): `this`

Initializes the needed stuff for the algorithm.

#### Returns

`this`

The instance of the class.

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
