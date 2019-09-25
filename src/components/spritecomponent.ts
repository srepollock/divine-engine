import { Component } from "./component";
import { Vector3 } from "../math/vector3";
import { Shader } from "../rendersystem/shader";
import { Sprite } from "../rendersystem/sprite";
import { IComponent } from "./icomponent";
import { IComponentBuilder } from "./icomponentbuilder";
import { IComponentData } from "./icomponentdata";
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

export class SpriteComponentData implements IComponentData {
    public name!: string;
    public materialName!: string;
    public origin: Vector3 = new Vector3(0.5, 0.5);
    public width!: number;
    public height!: number;
    /**
     * Class constructor
     * @param  {any} json
     */
    constructor(json: any) {
        this.setFromJson(json);
    }
    /**
     * Builds the component from JSON.
     * @param  {any} json
     * @returns IComponent
     */
    public setFromJson(json: any): void {
        if (json.name !== undefined) {
            this.name = json.name;
        }
        if (json.materialName !== undefined) {
            this.materialName = json.materialName;
        }
        if (json.origin !== undefined) {
            this.origin.setFromJson(json.origin);
        }
        if (json.width !== undefined) {
            this.width = Number(json.width);
        }
        if (json.height !== undefined) {
            this.height = Number(json.height);
        }
    }
}

export class SpriteComponentBuilder implements IComponentBuilder {
    /**
     * Gets the type of component.
     * @returns string
     */
    public get type(): string {
        return "sprite";
    }
    /**
     * Builds the component from JSON.
     * @param  {any} json
     * @returns IComponent
     */
    public buildFromJson(json: any): IComponent {
        let data: SpriteComponentData = new SpriteComponentData(json);
        return new SpriteComponent(data);
    }
}