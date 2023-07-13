import convertSumToString from './index.js';
import assert from 'node:assert'
import {describe, it} from 'node:test'

describe('convert', () => {
    it('converts a video', () => {
        assert.strictEqual(convertSumToString(2), '4');
    });
});