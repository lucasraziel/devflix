import type VideoService from '../../application/services/video-service.js';
import { ResolutionType } from '../../domain/entity/video-adapted.js';
import type VideoUploaded from '../../domain/entity/video-uploaded.js';
import VideoFile from '../../domain/value-objects/video-file.js';
import { Resolution, ffmpeg as Ffmpeg } from '@devflix/shared';
import { access } from 'node:fs/promises';
import Snapshot from '../../domain/value-objects/snapshot.js';

export default class VideoServiceFFMPeg implements VideoService {
  async getScreenshots(videoUploaded: VideoUploaded): Promise<Snapshot[]> {
    const { fileInfo } = videoUploaded;

    const ffmpegVideo = new Ffmpeg(fileInfo.path);

    const duration = await ffmpegVideo.getDurationInSeconds();

    const numberOfSnapshots = Math.floor(duration / 10) + 1;

    await ffmpegVideo.generateSnapshots(
      numberOfSnapshots,
      fileInfo.name.replace('.mp4', '-preview%000i.png'),
      fileInfo.folder
    );
    const snapshots: Snapshot[] = [];

    for (let i = 0; i < numberOfSnapshots; i++) {
      await access(
        fileInfo.path.replace(
          '.mp4',
          `-preview${String(i + 1).padStart(4, '0')}.png`
        )
      );
      const snapshot = new Snapshot(
        fileInfo.path.replace(
          '.mp4',
          `-preview${String(i + 1).padStart(4, '0')}.png`
        ),
        i * 10
      );
      snapshots.push(snapshot);
    }

    return snapshots;
  }

  async getDifferentResolutions(
    videoUploaded: VideoUploaded
  ): Promise<Map<ResolutionType, VideoFile>> {
    const resolutions = new Map<ResolutionType, VideoFile>();
    const { fileInfo, resolution } = videoUploaded;
    const videoFile = new VideoFile(fileInfo.path, resolution);
    const ffmpegVideo = new Ffmpeg(fileInfo.path);
    resolutions.set(ResolutionType.LARGE, videoFile);
    {
      await ffmpegVideo.resize(
        videoFile.path.replace('.mp4', '-medium.mp4'),
        '50%'
      );
      await access(videoFile.path.replace('.mp4', '-medium.mp4'));
      const resizedFfmpegVideo = new Ffmpeg(
        videoFile.path.replace('.mp4', '-medium.mp4')
      );
      const { width, height } = await resizedFfmpegVideo.getResolution();
      resolutions.set(
        ResolutionType.MEDIUM,
        new VideoFile(
          videoFile.path.replace('.mp4', '-medium.mp4'),
          new Resolution(Number(width), Number(height))
        )
      );
    }
    {
      await ffmpegVideo.resize(
        videoFile.path.replace('.mp4', '-small.mp4'),
        '25%'
      );
      const resizedFfmpegVideo = new Ffmpeg(
        videoFile.path.replace('.mp4', '-small.mp4')
      );
      await access(videoFile.path.replace('.mp4', '-small.mp4'));
      const { width, height } = await resizedFfmpegVideo.getResolution();
      resolutions.set(
        ResolutionType.SMALL,
        new VideoFile(
          videoFile.path.replace('.mp4', '-small.mp4'),
          new Resolution(Number(width), Number(height))
        )
      );
    }

    return resolutions;
  }
}
