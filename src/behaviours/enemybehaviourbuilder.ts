import { EnemyBehaviour } from "./enemybehaviour";
import { EnemyBehaviourData } from "./enemybehaviourdata";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

export class EnemyBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    public get type(): string {
        return "enemy";
    }
    public buildFromJson(json: any): IBehaviour {
        let data = new EnemyBehaviourData();
        data.setFromJson(json);
        return new EnemyBehaviour(data);
    }
}