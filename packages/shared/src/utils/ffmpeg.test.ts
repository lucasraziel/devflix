import { describe, it } from 'node:test';
import { access, unlink } from 'node:fs/promises';
import assert from 'node:assert';
import rootDir from './root-dir.js';
import FFProbe from './ffmpeg.js';
import { resolve } from 'node:path';

const videoFile = resolve(rootDir, 'test', 'video.mp4');

describe('ffprobe', () => {
  it('should get resolution', async () => {
    const ffmpegVideo = new FFProbe(videoFile);
    const { width, height } = await ffmpegVideo.getResolution();
    assert.strictEqual(width, 3840);
    assert.strictEqual(height, 2160);
  });

  it('should get Duration In Seconds', async () => {
    const ffmpegVideo = new FFProbe(videoFile);
    const duration = await ffmpegVideo.getDurationInSeconds();
    assert.strictEqual(duration, 25.08);
  });

  it('should get Duration In Milisseconds', async () => {
    const ffmpegVideo = new FFProbe(videoFile);
    const duration = await ffmpegVideo.getDurationInMilisseconds();
    assert.strictEqual(duration, 2508);
  });

  it('should divideBy2', async () => {
    const ffmpegVideo = new FFProbe(videoFile);

    await ffmpegVideo.resize(resolve(rootDir, 'test', 'video-2.mp4'), '50%');
    await access(resolve(rootDir, 'test', 'video-2.mp4'));
    const ffmpegVideoReduced = new FFProbe(
      resolve(rootDir, 'test', 'video-2.mp4')
    );
    const { width, height } = await ffmpegVideoReduced.getResolution();
    console.log(width, height);
    assert.strictEqual(width, 1920);
    assert.strictEqual(height, 1080);
    await unlink(resolve(rootDir, 'test', 'video-2.mp4'));
  });

  it('should divideBy4', async () => {
    const ffmpegVideo = new FFProbe(videoFile);

    await ffmpegVideo.resize(resolve(rootDir, 'test', 'video-2.mp4'), '25%');
    await access(resolve(rootDir, 'test', 'video-2.mp4'));
    const ffmpegVideoReduced = new FFProbe(
      resolve(rootDir, 'test', 'video-2.mp4')
    );
    const { width, height } = await ffmpegVideoReduced.getResolution();
    console.log(width, height);
    assert.strictEqual(width, 960);
    assert.strictEqual(height, 540);
    await unlink(resolve(rootDir, 'test', 'video-2.mp4'));
  });

  it('should generateSnapshot', async () => {
    const ffmpegVideo = new FFProbe(videoFile);
    const folder = resolve(rootDir, 'test');
    await ffmpegVideo.generateSnapshots(3, 'preview%0i.png', folder);
    await access(resolve(rootDir, 'test', 'preview01.png'));
    await access(resolve(rootDir, 'test', 'preview02.png'));
    await access(resolve(rootDir, 'test', 'preview03.png'));
    await unlink(resolve(rootDir, 'test', 'preview01.png'));
    await unlink(resolve(rootDir, 'test', 'preview02.png'));
    await unlink(resolve(rootDir, 'test', 'preview03.png'));
  });
});
