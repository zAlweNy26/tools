export interface Pipe<A, B> {
    (a: A): B;
    pipe<C>(fn2: (b: B) => C): Pipe<A, C>;
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
 */
function pipe<A, B>(fn: (a: A) => B): Pipe<A, B> {
    function run(a: A) {
        return fn(a)
    }

    run.pipe = <C>(fn2: (b: B) => C) => {
        return pipe((a: A) => fn2(fn(a)))
    }

    return run
}



const stringToDateAndTime = pipe(Date.parse).pipe(n => new Date(n))
    .pipe(d => d.toISOString()).pipe(s => s.split("T"))
    .pipe(a => ({ date: a[0], time: a[1] }))

console.log(stringToDateAndTime("Jan 1, 2022 12:00:00"))

export default pipe