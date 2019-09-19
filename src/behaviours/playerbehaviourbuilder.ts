import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { PlayerBehaviour } from "./playerbehaviour";
import { PlayerBehaviourData } from "./playerbehaviourdata";

export class PlayerBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "player";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new PlayerBehaviourData();
        data.setFromJson(json);
        return new PlayerBehaviour(data);
    }
}