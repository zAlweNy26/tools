export interface DimRedParams {
    dimensionality: number
    metric: (a: number[], b: number[]) => number | 'precomputed',
    seed: number
}

export interface TSNEParams extends DimRedParams {
    perplexity: number
    epsilon: number
}