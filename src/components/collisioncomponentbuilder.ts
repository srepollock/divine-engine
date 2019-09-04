import { CollisionComponent } from "./collisioncomponent";
import { CollisionComponentData } from "./collisioncomponentdata";
import { IComponent } from "./icomponent";
import { IComponentBuilder } from "./icomponentbuilder";

export class CollisionComponentBuilder implements IComponentBuilder {
    public get type(): string {
        return "collision";
    }
    public buildFromJson(json: any): IComponent {
        let data: CollisionComponentData = new CollisionComponentData(json);
        return new CollisionComponent(data);
    }
}