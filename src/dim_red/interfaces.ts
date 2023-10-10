/**
 * Interface for the parameters used in dimensionality reduction algorithms.
 */
export interface DimRedParams {
    /**
     * The desired dimensionality of the output data.
     */
    dimensionality: number
    /**
     * The metric used to measure the distance between two points in the input data.
     * Can be a function that takes two arrays of numbers and returns a number, or the string 'precomputed'.
     */
    metric: (a: number[], b: number[]) => number | 'precomputed',
    /**
     * The seed used to initialize the random number generator, if applicable.
     */
    seed: number
}

/**
 * Interface for t-SNE parameters, which extends the base dimensionality reduction parameters.
 */
export interface TSNEParams extends DimRedParams {
    /**
     * The perplexity parameter controls the balance between preserving local and global structure in the data.
     */
    perplexity: number
    /**
     * The epsilon parameter controls the learning rate for the optimization algorithm.
     */
    epsilon: number
}