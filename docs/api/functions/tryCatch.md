[Overview](../index.md) / tryCatch

# tryCatch()

> **tryCatch**\<`T`, `R`, `E`\>(`promise`, `options?`): `Promise`\<\[`undefined`, `R`\] \| \[`InstanceType`\<`E`\>\]\>

Catches errors from a promise.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `any` |
| `R` | `T` |
| `E` *extends* (...`args`) => `Error` | `ErrorConstructor` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `promise` | `Promise`\<`T`\> | The promise to handle. |
| `options?` | \{ `errorsToCatch?`: `E`[]; `logMessage?`: `boolean`; `onError?`: (`error`) => `void`; `onSuccess?`: (`result`) => `void`; `transform?`: (`data`) => `R`; \} | Additional options for handling the promise. |
| `options.errorsToCatch?` | `E`[] | An optional array of error constructors to catch |
| `options.logMessage?` | `boolean` | An optional boolean to log the error message |
| `options.onError?` | (`error`) => `void` | A callback function to execute on error |
| `options.onSuccess?` | (`result`) => `void` | A callback function to execute on success |
| `options.transform?` | (`data`) => `R` | A function to transform the result of the promise |

## Returns

`Promise`\<\[`undefined`, `R`\] \| \[`InstanceType`\<`E`\>\]\>

A tuple with either the error or the result of the promise.

## Throws

Will rethrow the error if it is not in the `errorsToCatch` array.

## Example

```ts
import { tryCatch } from '@danyalwe/tools'

const [error, result] = await tryCatch(fetch('https://api.example.com'))
if (error) console.error(error)
else console.log(result)
```
