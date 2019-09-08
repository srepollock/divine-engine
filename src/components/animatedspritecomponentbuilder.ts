import { AnimatedSpriteComponent } from "./animatedspritecomponent";
import { AnimatedSpriteComponentData } from "./animatedspritecomponentdata";
import { IComponent } from "./icomponent";
import { IComponentBuilder } from "./icomponentbuilder";

export class AnimatedSpriteComponentBuilder implements IComponentBuilder {
    public get type(): string {
        return "animatedsprite";
    }
    public buildFromJson(json: any): IComponent {
        let data: AnimatedSpriteComponentData = new AnimatedSpriteComponentData(json);
        return new AnimatedSpriteComponent(data);
    }
}