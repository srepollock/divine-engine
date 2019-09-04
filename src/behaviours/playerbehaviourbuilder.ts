import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { PlayerBehaviour } from "./playerbehaviour";
import { PlayerBehaviourData } from "./playerbehaviourdata";

export class PlayerBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    public get type(): string {
        return "player";
    }
    public buildFromJson(json: any): IBehaviour {
        let data = new PlayerBehaviourData();
        data.setFromJson(json);
        return new PlayerBehaviour(data);
    }
}