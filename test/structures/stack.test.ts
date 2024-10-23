import assert from 'node:assert'
import { test } from 'node:test'

void test('synchronous passing test', () => {
    assert.strictEqual(1, 1)
})

void test('synchronous failing test', () => {
    assert.strictEqual(1, 2)
})

void test('asynchronous passing test', () => {
    assert.strictEqual(1, 1)
})

void test('asynchronous failing test', () => {
    assert.strictEqual(1, 2)
})