import { IComponent, IComponentBuilder, SpriteComponent, SpriteComponentData } from ".";

export class SpriteComponentBuilder implements IComponentBuilder {
    public get type(): string {
        return "sprite";
    }
    public buildFromJson(json: any): IComponent {
        let data: SpriteComponentData = new SpriteComponentData(json);
        return new SpriteComponent(data);
    }
}