import { Component, SpriteComponentData } from ".";

import { Shader, Sprite, Vector3 } from "src";

export class SpriteComponent extends Component {
    private _sprite: Sprite;
    private _width: number;
    private _height: number;
    /**
     * Class constructor.
     * @param  {SpriteComponentData} data
     */
    public constructor(data: SpriteComponentData) {
        super(data);
        this._width = data.width;
        this._height = data.height;
        this._sprite = new Sprite(data.name, data.materialName, this._width, this._height);
        if (!data.origin.equals(new Vector3(0.5, 0.5))) {
            this._sprite.origin.copy(data.origin);
        }
    }
    /**
     * Loads the component.
     * @returns void
     */
    public load(): void {
        this._sprite.load();
    }
    /**
     * Renders the component.
     * @param  {Shader} shader
     * @returns void
     */
    public render(shader: Shader): void {
        this._sprite!.draw(shader, this._owner!.worldMatrix);
        super.render(shader);
    }
}