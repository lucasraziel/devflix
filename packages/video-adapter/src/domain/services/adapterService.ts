import type VideoAdapted from '../entity/video-adapted.js';
import type VideoUploaded from '../entity/video-uploaded.js';

export default interface IAdapterService {
  transformVideo: (videoUploaded: VideoUploaded) => Promise<VideoAdapted>;
}
