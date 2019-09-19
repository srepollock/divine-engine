import { CollisionComponent } from "./collisioncomponent";
import { CollisionComponentData } from "./collisioncomponentdata";
import { IComponent } from "./icomponent";
import { IComponentBuilder } from "./icomponentbuilder";

export class CollisionComponentBuilder implements IComponentBuilder {
    /**
     * Type of component to build.
     * @returns string
     */
    public get type(): string {
        return "collision";
    }
    /**
     * Builds the component from JSON.
     * @param  {any} json
     * @returns IComponent
     */
    public buildFromJson(json: any): IComponent {
        let data: CollisionComponentData = new CollisionComponentData(json);
        return new CollisionComponent(data);
    }
}