import sum from './index.js'
import assert from 'node:assert'
import {describe, it} from 'node:test'

describe('sum', () => {
    it('adds two numbers', () => {
        assert.strictEqual(sum(1, 2), 3);
    });
})