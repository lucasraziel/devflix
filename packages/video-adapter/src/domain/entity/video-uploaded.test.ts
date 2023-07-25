import { describe, it } from 'node:test';
import assert from 'node:assert';
import VideoUploaded from './video-uploaded.js';
import { FileInfo, Resolution } from '@devflix/shared';

describe('VideoUploaded', () => {
  it('should create a new video uploaded', () => {
    const resolution = new Resolution(3840, 2160);
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      '/path/to/video',
      '/folder'
    );

    const video = VideoUploaded.create({
      durationInSeconds: 25,
      fileInfo,
      resolution,
    });

    assert.strictEqual(
      video.durationInSeconds,
      25,
      'should be the same video duration'
    );
    assert(
      video.fileInfo.equals(fileInfo),
      'should be the same video file info'
    );
    assert(
      video.resolution.equals(resolution),
      'should be the same video resolution'
    );
  });

  it('should alter the video duration', () => {
    const resolution = new Resolution(3840, 2160);
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      '/path/to/video',
      '/folder'
    );

    const video = VideoUploaded.create({
      durationInSeconds: 25,
      fileInfo,
      resolution,
    });

    video.durationInSeconds = 30;
    assert.strictEqual(
      video.durationInSeconds,
      30,
      'should be the same video duration'
    );
  });

  it('should alter the video file info', () => {
    const resolution = new Resolution(3840, 2160);
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      '/path/to/video',
      '/folder'
    );

    const video = VideoUploaded.create({
      durationInSeconds: 25,
      fileInfo,
      resolution,
    });

    const fileInfo2 = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      '/path/to/video2',
      '/folder'
    );
    video.fileInfo = fileInfo2;
    assert(
      video.fileInfo.equals(fileInfo2),
      'should be the same video file info'
    );
  });

  it('should alter the video resolution', () => {
    const resolution = new Resolution(3840, 2160);
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      '/path/to/video',
      '/folder'
    );

    const video = VideoUploaded.create({
      durationInSeconds: 25,
      fileInfo,
      resolution,
    });

    const resolution2 = new Resolution(1920, 1080);
    video.resolution = resolution2;
    assert(
      video.resolution.equals(resolution2),
      'should be the same video resolution'
    );
  });
});
