import {describe, it} from 'node:test';
import assert from 'node:assert';
import Resolution from './resolution.js';

describe('Resolution', () => {
    it('should create a new resolution', () => {
        const resolution = new Resolution(3840, 2160);
        assert.strictEqual(resolution.width, 3840, 'should have the same width');
        assert.strictEqual(resolution.height, 2160, 'should have the same height');
    });

    it('should compare equally resolutions with same width and height', () => {
        const resolution = new Resolution(3840, 2160);
        const resolution2 = new Resolution(3840, 2160);
        assert(resolution.equals(resolution2), 'should be equal');
    })
    it('should compare different resolutions with different width and height', () => {
        const resolution = new Resolution(3840, 2160);
        const resolution2 = new Resolution(1920, 1080);
        assert(!resolution.equals(resolution2), 'should not be equal');
    });
    it('should compare different resolutions with different width', () => {
        const resolution = new Resolution(3840, 2160);
        const resolution2 = new Resolution(1920, 2160);
        assert(!resolution.equals(resolution2), 'should not be equal');
    });
    it('should compare different resolutions with different height', () => {
        const resolution = new Resolution(3840, 2160);
        const resolution2 = new Resolution(3840, 1080);
        assert(!resolution.equals(resolution2), 'should not be equal');
    });
});