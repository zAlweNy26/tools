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

## Properties

| Property | Modifier | Type | Default value |
| ------ | ------ | ------ | ------ |
| <a id="property-_data"></a> `_data` | `public` | [`Matrix`](Matrix.md) | `undefined` |
| <a id="property-_initialized"></a> `_initialized` | `protected` | `boolean` | `false` |
| <a id="property-_iter"></a> `_iter` | `protected` | `number` | `0` |
| <a id="property-_params"></a> `_params` | `protected` | `P` & [`DimRedParams`](../interfaces/DimRedParams.md) | `undefined` |
| <a id="property-_projection"></a> `_projection` | `public` | [`Matrix`](Matrix.md) | `undefined` |
| <a id="property-_randomizer"></a> `_randomizer` | `protected` | [`Randomizer`](Randomizer.md) | `undefined` |
| <a id="property-_result"></a> `_result` | `public` | [`Matrix`](Matrix.md) | `undefined` |

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

### checkInit()

> `protected` **checkInit**(): `void`

Checks if the class has been initialized and initializes it if it hasn't.

#### Returns

`void`

***

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

### next()

> `abstract` `protected` **next**(): [`Matrix`](Matrix.md)

Calculates the next projection of the data.

#### Returns

[`Matrix`](Matrix.md)

The next projection of the data.

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
