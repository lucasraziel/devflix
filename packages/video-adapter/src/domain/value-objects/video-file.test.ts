import { describe, it } from 'node:test';
import assert from 'node:assert';
import VideoFile from './video-file.js';
import { Resolution } from '@devflix/shared';

describe('VideoFile', () => {
  it('should create a new video file', () => {
    const resolution = new Resolution(1920, 1080);
    const videoFile = new VideoFile('/path/to/video', resolution);
    assert.strictEqual(
      videoFile.path,
      '/path/to/video',
      'should be the same video path'
    );
    assert(
      videoFile.resolution.equals(resolution),
      'should be the same video resolution'
    );
  });
  describe('equals', () => {
    it('should compare equally video files with same values', () => {
      const resolution = new Resolution(1920, 1080);
      const resolution2 = new Resolution(1920, 1080);
      const videoFile = new VideoFile('/path/to/video', resolution);
      const videoFile2 = new VideoFile('/path/to/video', resolution2);
      assert(videoFile.equals(videoFile2), 'should be equal');
    });
    it('should compare different video files with different values', () => {
      const resolution = new Resolution(1920, 1080);
      const resolution2 = new Resolution(1280, 720);
      const videoFile = new VideoFile('/path/to/video', resolution);
      const videoFile2 = new VideoFile('/path/to/video2', resolution2);
      assert(!videoFile.equals(videoFile2), 'should not be equal');
    });
    it('should compare different video files with different paths', () => {
      const resolution = new Resolution(1920, 1080);
      const videoFile = new VideoFile('/path/to/video', resolution);
      const videoFile2 = new VideoFile('/path/to/video2', resolution);
      assert(!videoFile.equals(videoFile2), 'should not be equal');
    });
    it('should compare different video files with different resolutions', () => {
      const resolution = new Resolution(1920, 1080);
      const resolution2 = new Resolution(1280, 720);
      const videoFile = new VideoFile('/path/to/video', resolution);
      const videoFile2 = new VideoFile('/path/to/video', resolution2);
      assert(!videoFile.equals(videoFile2), 'should not be equal');
    });
  });
});
