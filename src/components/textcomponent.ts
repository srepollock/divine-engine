import { Component } from "./component";
import { Text } from "src/rendersystem/text";
import { IComponent, IComponentBuilder } from ".";
import { IComponentData } from "./icomponentdata";

export class TextComponent extends Component {
    public text: string;
    /**
     * Class constructor.
     * @param  {TextComponentData} data
     */
    public constructor(data: TextComponentData) {
        super(data);
        this.text = data.text;
    }
    /**
     * Loads the component.
     * @returns void
     */
    public load(): void {
        
    }
    /**
     * Updates the component.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        super.update(delta);
    }
}

export class TextComponentData implements IComponentData {
    public name!: string;
    public text: string = "";
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
        if (json.text !== undefined) {
            this.text = String(json.text);
        }
    }
}

export class TextComponentBuilder implements IComponentBuilder {
    /**
     * Gets the type of component.
     * @returns string
     */
    public get type(): string {
        return "text";
    }
    /**
     * Builds the component from JSON.
     * @param  {any} json
     * @returns IComponent
     */
    public buildFromJson(json: any): IComponent {
        let data: TextComponentData = new TextComponentData(json);
        return new TextComponent(data);
    }
}