import { type ResolutionType } from '../../domain/entity/video-adapted';
import type VideoUploaded from '../../domain/entity/video-uploaded.js';
import type Snapshot from '../../domain/value-objects/snapshot.js';
import type VideoFile from '../../domain/value-objects/video-file.js';

export default interface VideoService {
  getDifferentResolutions: (
    videoUploaded: VideoUploaded
  ) => Promise<Map<ResolutionType, VideoFile>>;
  getScreenshots: (videoUploaded: VideoUploaded) => Promise<Snapshot[]>;
}
