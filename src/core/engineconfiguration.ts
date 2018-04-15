export class EngineConfiguration {
    constructor(
        public _height: number,
        public _width: number
    ) {}
    public get height(): number {
        return this._height;
    }
    public set height(height: number) {
        this._height = height;
    }
    public get width(): number {
        return this._width;
    }
    public set width(width: number) {
        this._width = width;
    }
}