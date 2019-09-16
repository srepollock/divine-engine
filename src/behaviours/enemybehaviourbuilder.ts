import { EnemyBehaviour } from "./enemybehaviour";
import { EnemyBehaviourData } from "./enemybehaviourdata";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

export class EnemyBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "enemy";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new EnemyBehaviourData();
        data.setFromJson(json);
        return new EnemyBehaviour(data);
    }
}