import {describe, it} from 'node:test';
import assert from 'node:assert';
import rootDir from './root-dir.js';
import { access, unlink} from 'node:fs/promises'

import ffmpeg from './ffmpeg.js';
import ffprobe from './ffprobe.js';
import { resolve } from 'node:path';

const videoFile = resolve(rootDir, 'test', 'video.mp4');

describe('ffmpeg', () => {
    it('should be a function', () => {
        assert.strictEqual(typeof ffmpeg, 'function');
    });

    it('should divideBy2', async ()=> {
        await ffmpeg.divideBy2(videoFile, resolve(rootDir, 'test', 'video-2.mp4'));
        await access(resolve(rootDir, 'test', 'video-2.mp4'));
        const {width, height} = await ffprobe.getResolution(resolve(rootDir, 'test', 'video-2.mp4'));
        console.log(width, height)
        assert.strictEqual(width, 1920);
        assert.strictEqual(height, 1080);
        await unlink(resolve(rootDir, 'test', 'video-2.mp4'));
    });

    it('should divideBy4', async ()=> {
        await ffmpeg.divideBy4(videoFile, resolve(rootDir, 'test', 'video-4.mp4'));
        await access(resolve(rootDir, 'test', 'video-4.mp4'));
        const {width, height} = await ffprobe.getResolution(resolve(rootDir, 'test', 'video-4.mp4'));
        console.log(width, height)
        assert.strictEqual(width, 960);
        assert.strictEqual(height, 540);
        await unlink(resolve(rootDir, 'test', 'video-4.mp4'));
    });
});