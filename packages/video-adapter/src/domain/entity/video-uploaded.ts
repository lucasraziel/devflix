import { Entity, type FileInfo, type Resolution } from '@devflix/shared';

interface VideoUploadedDataModel extends Record<string, unknown> {
  durationInSeconds: number;
  fileInfo: FileInfo;
  resolution: Resolution;
}

export default class VideoUploaded extends Entity<VideoUploadedDataModel> {
  static create(dataModel: VideoUploadedDataModel): VideoUploaded {
    return new VideoUploaded(dataModel);
  }

  public set durationInSeconds(duration: number) {
    this._dataModel.durationInSeconds = duration;
  }

  public get durationInSeconds(): number {
    return this._dataModel.durationInSeconds;
  }

  public set fileInfo(fileInfo: FileInfo) {
    this._dataModel.fileInfo = fileInfo;
  }

  public get fileInfo(): FileInfo {
    return this._dataModel.fileInfo;
  }

  public set resolution(resolution: Resolution) {
    this._dataModel.resolution = resolution;
  }

  public get resolution(): Resolution {
    return this._dataModel.resolution;
  }
}
