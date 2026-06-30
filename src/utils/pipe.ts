/**
 * Interface for a pipable function that allows chaining operations.
 * @template A The input type.
 * @template B The output type.
 * @group Utils
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

/**
 * Creates a pipeline of functions where the output of one function is passed as the input to the next.
 * @param fn The initial function to start the pipeline.
 * @example
 * ```ts
 * const addOne = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 *
 * const pipeline = pipe(addOne).pipe(double);
 *
 * console.log(pipeline.run(3)); // Outputs: 8
 * ```
 * @group Utils
 */
export function pipe<A, B>(fn: (a: A) => B): Pipe<A, B> {
  function run(a: A) {
    return fn(a)
  }

  run.pipe = <C>(fn2: (b: B) => C) => {
    return pipe((a: A) => fn2(fn(a)))
  }

  return run
}
