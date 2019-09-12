import { AnimatedSpriteComponent } from "./animatedspritecomponent";
import { AnimatedSpriteComponentData } from "./animatedspritecomponentdata";
import { IComponent } from "./icomponent";
import { IComponentBuilder } from "./icomponentbuilder";

export class AnimatedSpriteComponentBuilder implements IComponentBuilder {
    /**
     * Gets the type of animated sprite.
     * @returns string
     */
    public get type(): string {
        return "animatedsprite";
    }
    /**
     * Builds the component from JSON.
     * @param  {any} json
     * @returns IComponent
     */
    public buildFromJson(json: any): IComponent {
        let data: AnimatedSpriteComponentData = new AnimatedSpriteComponentData(json);
        return new AnimatedSpriteComponent(data);
    }
}