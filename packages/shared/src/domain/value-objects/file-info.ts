export default class FileInfo {
  private readonly _name: string;
  private readonly _size: number;
  private readonly _mimeType: string;
  private readonly _extension: string;
  private readonly _path: string;

  constructor(
    name: string,
    size: number,
    mimeType: string,
    extension: string,
    path: string
  ) {
    this._name = name;
    this._size = size;
    this._mimeType = mimeType;
    this._extension = extension;
    this._path = path;
  }

  public get name(): string {
    return this._name;
  }

  public get size(): number {
    return this._size;
  }

  public get mimeType(): string {
    return this._mimeType;
  }

  public get extension(): string {
    return this._extension;
  }

  public get path(): string {
    return this._path;
  }

  public equals(other: FileInfo): boolean {
    return (
      this.name === other.name &&
      this.size === other.size &&
      this.mimeType === other.mimeType &&
      this.extension === other.extension &&
      this.path === other.path
    );
  }
}
