import { Message, PhysicsSystemMessage } from "../messagesystem";
import { System } from "../system";

export class PhysicsSystem extends System {
    /**
     * Physics system constructor.
     */
    constructor() {
        super("physicssystem");
    }
    public cleanup(): void {

    }
    public start(): void {

    }
    public stop(): void {

    }
    public update(delta: number): void {
        // TODO: Should handle the messages passed to the system.
    }
    public onMessage(message: Message): void {
        let pm = message as PhysicsSystemMessage; // NOTE: cast to Physics message. Should only ever be this type.s
    }
}