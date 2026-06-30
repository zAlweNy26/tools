/**
 * Interface for a pipable function that allows chaining operations.
 * @template A The input type.
 * @template B The output type.
 * @group Interfaces
 */
export interface Pipe<A, B> {
  /**
   * Executes the pipeline with the given input and returns the final output.
   * @param a The input value.
   * @returns The output after all pipeline stages have been applied.
   */
  (a: A): B
  /**
   * Chains another function to the pipeline. The output of the current pipeline
   * is passed as input to the next function.
   * @param fn2 The next function to add to the pipeline.
   * @returns A new Pipe representing the extended pipeline.
   */
  pipe: <C>(fn2: (b: B) => C) => Pipe<A, C>
}
