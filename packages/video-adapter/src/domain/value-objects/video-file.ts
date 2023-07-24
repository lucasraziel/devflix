import { type Resolution } from '@devflix/shared';

export default class VideoFile {
  private readonly _path: string;
  private readonly _resolution: Resolution;

  constructor(path: string, resolution: Resolution) {
    this._path = path;
    this._resolution = resolution;
  }

  public get path(): string {
    return this._path;
  }

  public get resolution(): Resolution {
    return this._resolution;
  }

  public equals(other: VideoFile): boolean {
    return this.path === other.path && this.resolution.equals(other.resolution);
  }
}
