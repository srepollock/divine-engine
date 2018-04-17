export class GameWindow {
    constructor(
        public title: string = "", 
        private _height: number = 0, 
        private _width: number = 0
    ) {
        this.title = title;
        this._height = _height;
        this._width = _width;
    }
    public get height(): number {
        return this._height;
    }
    public get width(): number {
        return this._width;
    }
    public resize(height: number, width: number): void {
        this._height = height;
        this._width = width;
    }
}