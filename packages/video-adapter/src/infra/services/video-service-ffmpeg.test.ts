import { describe, it } from 'node:test';
import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import VideoUploaded from '../../domain/entity/video-uploaded.js';
import { FileInfo, Resolution, RootDir } from '@devflix/shared';
import VideoServiceFFMPeg from './video-service-ffmpeg.js';
import { assert } from 'console';
import { ResolutionType } from '../../domain/entity/video-adapted.js';

const path = resolve(RootDir, 'test', 'video.mp4');
describe('VideoServiceFFMPeg', () => {
  it('should get different resolutions', async () => {
    const resolution = new Resolution(3840, 2160);
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      path
    );
    const videoServiceFFMPeg = new VideoServiceFFMPeg();

    const video = VideoUploaded.create({
      durationInSeconds: 25,
      fileInfo,
      resolution,
    });

    const resolutions = await videoServiceFFMPeg.getDifferentResolutions(video);

    assert(resolutions.size === 3, 'should have 3 resolutions');
    assert(
      resolutions.get(ResolutionType.LARGE)?.path === path,
      'should have the same path'
    );
    assert(
      resolutions.get(ResolutionType.MEDIUM)?.path ===
        path.replace('.mp4', '-medium.mp4'),
      'medium should have the same path'
    );
    assert(
      resolutions.get(ResolutionType.SMALL)?.path ===
        path.replace('.mp4', '-small.mp4'),
      'small should have the same path'
    );

    await unlink(path.replace('.mp4', '-medium.mp4'));
    await unlink(path.replace('.mp4', '-small.mp4'));
  });

  it('should get snapshots', async () => {
    const resolution = new Resolution(3840, 2160);
    const fileInfo = new FileInfo(
      'video.mp4',
      100000,
      'video/mp4',
      'mp4',
      path
    );
    const videoServiceFFMPeg = new VideoServiceFFMPeg();

    const video = VideoUploaded.create({
      durationInSeconds: 25,
      fileInfo,
      resolution,
    });

    const snapshots = await videoServiceFFMPeg.getScreenshots(video);

    assert(snapshots.length === 3, 'should have 3 snapshots');
    assert(
      snapshots[0].path === path.replace('.mp4', '-preview1.png'),
      'should have the same path'
    );
    assert(
      snapshots[1].path === path.replace('.mp4', '-preview2.png'),
      'should have the same path'
    );
    assert(
      snapshots[2].path === path.replace('.mp4', '-preview3.png'),
      'should have the same path'
    );

    await unlink(path.replace('.mp4', '-preview1.png'));
    await unlink(path.replace('.mp4', '-preview2.png'));
    await unlink(path.replace('.mp4', '-preview3.png'));
  });
});
