import type VideoService from '../../application/services/video-service.js';
import { ResolutionType } from '../../domain/entity/video-adapted.js';
import type VideoUploaded from '../../domain/entity/video-uploaded.js';
import VideoFile from '../../domain/value-objects/video-file.js';
import { Resolution, ffmpeg, ffprobe } from '@devflix/shared';
import { access } from 'node:fs/promises';

export default class VideoServiceFFMPeg implements VideoService {
  async getDifferentResolutions(
    videoUploaded: VideoUploaded
  ): Promise<Map<ResolutionType, VideoFile>> {
    const resolutions = new Map<ResolutionType, VideoFile>();
    const { fileInfo, resolution } = videoUploaded;
    const videoFile = new VideoFile(fileInfo.path, resolution);
    resolutions.set(ResolutionType.LARGE, videoFile);
    {
      await ffmpeg.divideBy2(
        videoFile.path,
        videoFile.path.replace('.mp4', '-medium.mp4')
      );
      await access(videoFile.path.replace('.mp4', '-medium.mp4'));
      const { width, height } = await ffprobe.getResolution(
        videoFile.path.replace('.mp4', '-medium.mp4')
      );
      resolutions.set(
        ResolutionType.MEDIUM,
        new VideoFile(
          videoFile.path.replace('.mp4', '-medium.mp4'),
          new Resolution(Number(width), Number(height))
        )
      );
    }
    {
      await ffmpeg.divideBy4(
        videoFile.path,
        videoFile.path.replace('.mp4', '-small.mp4')
      );
      await access(videoFile.path.replace('.mp4', '-small.mp4'));
      const { width, height } = await ffprobe.getResolution(
        videoFile.path.replace('.mp4', '-small.mp4')
      );
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
