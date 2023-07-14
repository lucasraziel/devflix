export default class SubtitleLanguage {
  private readonly _language: string;
  private readonly _path: string;

  constructor(language: string, path: string) {
    this._language = language;
    this._path = path;
  }

  public get language(): string {
    return this._language;
  }

  public get path(): string {
    return this._path;
  }

  public equals(other: SubtitleLanguage): boolean {
    return this.language === other.language && this.path === other.path;
  }
}
