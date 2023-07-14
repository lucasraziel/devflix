export default class Resolution {
    private readonly _width: number;
    private readonly _height: number;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public equals(other: Resolution): boolean {
        return this.width === other.width && this.height === other.height;
    }
}