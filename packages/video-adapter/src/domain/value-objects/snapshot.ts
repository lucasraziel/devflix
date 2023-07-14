export default class Snapshot {
  private readonly _path: string;
  private readonly _duration: number;

  constructor(path: string, duration: number) {
    this._path = path;
    this._duration = duration;
  }

  public get path(): string {
    return this._path;
  }

  public get duration(): number {
    return this._duration;
  }

  public equals(other: Snapshot): boolean {
    return this.path === other.path && this.duration === other.duration;
  }
}
