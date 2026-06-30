[Overview](../index.md) / Matrix

# Matrix

A matrix data structure.

## Implements

- [`Structure`](../interfaces/Structure.md)

## Constructors

### Constructor

> **new Matrix**(`rows`, `cols`, `value?`): `Matrix`

Creates a new matrix with the specified number of rows and columns.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rows` | `number` | The number of rows in the matrix. |
| `cols` | `number` | The number of columns in the matrix. |
| `value?` | `number` \| ((`row`, `col`) => `number`) \| `"identity"` | The initial value of the matrix. Can be a number, a function that returns a number, or the string `identity`. If a number is provided, all elements of the matrix will be set to that number. If a function is provided, it will be called for each element of the matrix to determine its initial value. If `identity` is provided, the matrix will be initialized as an identity matrix. |

#### Returns

`Matrix`

#### Throws

An error if the number of rows or columns is less than or equal to 1.

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="property-cols"></a> `cols` | `public` | `number` | The number of columns in the matrix. |
| <a id="property-rows"></a> `rows` | `public` | `number` | The number of rows in the matrix. |

## Accessors

### diagonal

#### Get Signature

> **get** **diagonal**(): `number`[]

Returns an array containing the diagonal elements of the matrix.
If the matrix is not square, the diagonal is truncated to the smaller dimension.

##### Returns

`number`[]

An array containing the diagonal elements of the matrix.

***

### hasRoom

#### Get Signature

> **get** **hasRoom**(): `boolean`

Returns a boolean indicating whether the matrix has room for more elements.

##### Returns

`boolean`

True if the matrix has room for more elements, false otherwise.

***

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Returns a boolean indicating whether the matrix is empty or not.

##### Returns

`boolean`

True if the matrix is empty, false otherwise.

***

### isFull

#### Get Signature

> **get** **isFull**(): `boolean`

Returns a boolean indicating whether the matrix is full or not.

##### Returns

`boolean`

True if the matrix is full, false otherwise.

***

### items

#### Get Signature

> **get** **items**(): `number`[][]

Returns a copy of the matrix data as a two-dimensional array.

##### Returns

`number`[][]

A copy of the matrix data.

***

### meanCols

#### Get Signature

> **get** **meanCols**(): `number`[]

Returns an array containing the mean value of each column in the matrix.

##### Returns

`number`[]

An array containing the mean value of each column in the matrix.

***

### meanRows

#### Get Signature

> **get** **meanRows**(): `number`[]

Returns an array containing the mean value of each row in the matrix.

##### Returns

`number`[]

An array containing the mean value of each row in the matrix.

***

### space

#### Get Signature

> **get** **space**(): `number`

Returns the number of empty spaces in the matrix.

##### Returns

`number`

The number of empty spaces in the matrix.

***

### sum

#### Get Signature

> **get** **sum**(): `number`

Returns the sum of all elements in the matrix.

##### Returns

`number`

The sum of all elements in the matrix.

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Generator`\<`number`[], `void`, `unknown`\>

Returns an iterator that yields each row of the matrix.

#### Returns

`Generator`\<`number`[], `void`, `unknown`\>

An iterator that yields each row of the matrix.

#### Yields

The current row after each iteration.

***

### clear()

> **clear**(): `Matrix`

Removes all the values present in the matrix.

#### Returns

`Matrix`

The cleared matrix.

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`clear`](../interfaces/Structure.md#property-clear)

***

### clone()

> **clone**(): `Matrix`

Returns a new matrix that is a clone of the current matrix instance.

#### Returns

`Matrix`

A new matrix that is a clone of the current matrix instance.

***

### concat()

> **concat**(`mat`, `type?`): `Matrix`

Concatenates two matrices either horizontally or vertically.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `mat` | `Matrix` | `undefined` | The matrix to concatenate with. |
| `type` | `"horizontal"` \| `"vertical"` | `'horizontal'` | The type of concatenation to perform. Can be 'horizontal' or 'vertical'. Defaults to 'horizontal'. |

#### Returns

`Matrix`

A new matrix that is the result of the concatenation.

#### Throws

An error if the matrices do not have the same number of rows (for horizontal concatenation) or columns (for vertical concatenation).

***

### det()

> **det**(): `number`

Calculates the determinant of a square matrix.

#### Returns

`number`

The determinant of the matrix.

#### Throws

An error if the matrix is not quadratic.

***

### dot()

> **dot**(`matrix`): `Matrix`

Returns the dot product of the current matrix and the passed matrix.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `matrix` | `Matrix` \| `number`[][] | The matrix to multiply with the current matrix. |

#### Returns

`Matrix`

A new matrix that is the result of the dot product.

#### Throws

An error if the number of columns of the current matrix is different from the number of rows of the passed matrix.

***

### get()

> **get**(`row`, `col`): `number`

Returns the value at the specified row and column in the matrix.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `row` | `number` | The row index of the element to retrieve. |
| `col` | `number` | The column index of the element to retrieve. |

#### Returns

`number`

The value at the specified row and column in the matrix.

***

### getCol()

> **getCol**(`col`): `number`[]

Returns an array containing the elements of the specified column in the matrix.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `col` | `number` | The index of the column to retrieve. |

#### Returns

`number`[]

An array containing the elements of the specified column.

#### Throws

An error if the passed index exceeds the total number of columns in the matrix.

***

### getRow()

> **getRow**(`row`): `number`[]

Returns the row at the specified index.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `row` | `number` | The index of the row to retrieve. |

#### Returns

`number`[]

The row at the specified index.

#### Throws

An error if the passed index exceeds the total number of rows in the matrix.

***

### inverse()

> **inverse**(): `Matrix`

Calculates the inverse of a square matrix.

#### Returns

`Matrix`

The inverse of the matrix.

#### Throws

An error if the matrix is not quadratic.

#### Throws

An error if the matrix not invertible due to the determinant equal to zero.

***

### iterateCols()

> **iterateCols**(): `Generator`\<`number`[], `void`, `unknown`\>

Returns a generator that iterates over the columns of the matrix.

#### Returns

`Generator`\<`number`[], `void`, `unknown`\>

A generator that yields each column of the matrix.

#### Yields

The current column after each iteration.

***

### iterateRows()

> **iterateRows**(): `Generator`\<`number`[], `void`, `unknown`\>

Returns a generator that iterates over the rows of the matrix.

#### Returns

`Generator`\<`number`[], `void`, `unknown`\>

A generator that yields each row of the matrix.

#### Yields

The current row after each iteration.

***

### operate()

> **operate**(`matrix`, `value`): `number`[][]

Applies a binary operation to each element of the current matrix and another matrix.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `matrix` | `Matrix` \| `number`[][] | The matrix to operate with. |
| `value` | (`left`, `right`) => `number` | The binary operation to apply to each element. |

#### Returns

`number`[][]

A new matrix with the result of the operation.

#### Throws

If the number of columns of the current matrix is different from the number of rows of the passed matrix.

***

### set()

> **set**(`row`, `col`, `value`): `number`

Sets the value of a specific cell in the matrix.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `row` | `number` | The row index of the cell to set. |
| `col` | `number` | The column index of the cell to set. |
| `value` | `number` | The value to set in the cell. |

#### Returns

`number`

The value that was set in the cell.

***

### setCol()

> **setCol**(`col`, `values`): `Matrix`

Sets the values of a given column in the matrix.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `col` | `number` | The index of the column to set. |
| `values` | `number`[] | An array of values to set in the column. |

#### Returns

`Matrix`

The updated matrix.

#### Throws

An error if the passed index exceeds the total number of columns in the matrix.

#### Throws

An error if the passed values exceed the total number of columns in the matrix.

***

### setRow()

> **setRow**(`row`, `values`): `Matrix`

Sets the values of a row in the matrix.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `row` | `number` | The index of the row to set. |
| `values` | `number`[] | The values to set for the row. |

#### Returns

`Matrix`

The updated matrix.

#### Throws

If the passed index exceeds the total number of rows in the matrix or if the passed values exceed the total number of rows in the matrix.

***

### size()

> **size**(): `number`

The current number of elements in the matrix.

#### Returns

`number`

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`size`](../interfaces/Structure.md#property-size)

***

### sub()

> **sub**(`row`, `col`): `Matrix`

Returns a new matrix that is a submatrix of the current matrix with the specified row and column removed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `row` | `number` | The row to remove. |
| `col` | `number` | The column to remove. |

#### Returns

`Matrix`

A new matrix that is a submatrix of the current matrix with the specified row and column removed.

***

### swapCols()

> **swapCols**(`col1`, `col2`): `Matrix`

Swaps two columns in the matrix.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `col1` | `number` | The index of the first column to swap. |
| `col2` | `number` | The index of the second column to swap. |

#### Returns

`Matrix`

The updated matrix with the swapped columns.

***

### swapRows()

> **swapRows**(`row1`, `row2`): `Matrix`

Swaps two rows in the matrix.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `row1` | `number` | The index of the first row to swap. |
| `row2` | `number` | The index of the second row to swap. |

#### Returns

`Matrix`

The updated matrix with the swapped rows.

***

### transpose()

> **transpose**(): `Matrix`

Returns a new matrix that is the transpose of the current matrix.

#### Returns

`Matrix`

A new matrix that is the transpose of the current matrix.

***

### update()

> **update**(`row`, `col`, `value`): `number`

Updates the value at the specified row and column index using the provided update function.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `row` | `number` | The row index of the value to update. |
| `col` | `number` | The column index of the value to update. |
| `value` | (`old`) => `number` | The update function that takes the old value as input and returns the new value. |

#### Returns

`number`

The new value after the update.

***

### from()

#### Call Signature

> `static` **from**(`array`): `Matrix`

Creates a new matrix instance from a 2D array.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `number`[][] | The 2D array to use for the new matrix instance. |

##### Returns

`Matrix`

A new matrix instance.

##### Throws

An error if the array is empty or not all the columns of the 2D array have the same length.

#### Call Signature

> `static` **from**(`array`, `fill`): `Matrix`

Creates a new matrix instance from a 1D array with the specified fill method.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `number`[] | The 1D array to use for the new matrix instance. |
| `fill` | `"row"` \| `"col"` \| `"diag"` | The fill method. Can be `row`, `col`, or `diag`. |

##### Returns

`Matrix`

A new matrix instance.

##### Throws

An error if the array is empty.
