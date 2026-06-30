[Overview](../index.md) / DimRedParams

# DimRedParams

Interface for the parameters used in dimensionality reduction algorithms.

## Extended by

- [`TSNEParams`](TSNEParams.md)

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-dimensionality"></a> `dimensionality` | `number` | The desired dimensionality of the output data. |
| <a id="property-metric"></a> `metric` | (`a`, `b`) => `number` \| `"precomputed"` | The metric used to measure the distance between two points in the input data. Can be a function that takes two arrays of numbers and returns a number, or the string 'precomputed'. |
| <a id="property-seed"></a> `seed` | `number` | The seed used to initialize the random number generator, if applicable. |
