import add2 from './index.js';
import assert from 'node:assert'
import {describe, it} from 'node:test'

describe('add2', () => {
    it('adds two numbers', () => {
        assert.strictEqual(add2(1), 3);
    });
})