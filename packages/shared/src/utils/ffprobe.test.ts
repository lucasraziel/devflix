import { describe, it } from 'node:test';
import assert from 'node:assert';
import rootDir from './root-dir.js';
import ffprobe from './ffprobe.js';
import { resolve } from 'node:path';

const videoFile = resolve(rootDir, 'test', 'video.mp4');

describe('ffprobe', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof ffprobe, 'function');
  });

  it('should get resolution', async () => {
    const { width, height } = await ffprobe.getResolution(videoFile);
    assert.strictEqual(width, 3840);
    assert.strictEqual(height, 2160);
  });
});
