export default class AudioLanguage {
  private readonly _language: string;
  private readonly _channels: number;
  private readonly _path: string;

  constructor(language: string, channels: number, path: string) {
    this._language = language;
    this._channels = channels;
    this._path = path;
  }

  public get language(): string {
    return this._language;
  }

  public get channels(): number {
    return this._channels;
  }

  public get path(): string {
    return this._path;
  }

  public equals(other: AudioLanguage): boolean {
    return (
      this.language === other.language &&
      this.channels === other.channels &&
      this.path === other.path
    );
  }
}
