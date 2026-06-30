[Overview](../index.md) / TSNEParams

# TSNEParams

Interface for t-SNE parameters, which extends the base dimensionality reduction parameters.

## Extends

- [`DimRedParams`](DimRedParams.md)

## Properties

| Property | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ |
| <a id="property-dimensionality"></a> `dimensionality` | `number` | The desired dimensionality of the output data. | [`DimRedParams`](DimRedParams.md).[`dimensionality`](DimRedParams.md#property-dimensionality) |
| <a id="property-epsilon"></a> `epsilon` | `number` | The epsilon parameter controls the learning rate for the optimization algorithm. | - |
| <a id="property-metric"></a> `metric` | (`a`, `b`) => `number` \| `"precomputed"` | The metric used to measure the distance between two points in the input data. Can be a function that takes two arrays of numbers and returns a number, or the string 'precomputed'. | [`DimRedParams`](DimRedParams.md).[`metric`](DimRedParams.md#property-metric) |
| <a id="property-perplexity"></a> `perplexity` | `number` | The perplexity parameter controls the balance between preserving local and global structure in the data. | - |
| <a id="property-seed"></a> `seed` | `number` | The seed used to initialize the random number generator, if applicable. | [`DimRedParams`](DimRedParams.md).[`seed`](DimRedParams.md#property-seed) |
