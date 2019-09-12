import { IComponent, IComponentBuilder, SpriteComponent, SpriteComponentData } from ".";

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