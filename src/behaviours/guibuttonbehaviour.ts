import { Behaviour } from "./behaviour";
import { GUIButtonBehaviourData } from "./guibuttonbehaviourdata";

export class GUIButtonBehaviour extends Behaviour {
    public zoneName: string;
    /**
     * Class constructor
     * @param  {GUIButtonBehaviourData} data
     */
    constructor(data: GUIButtonBehaviourData) {
        super(data);
        this.zoneName = data.zoneName;
    }
}