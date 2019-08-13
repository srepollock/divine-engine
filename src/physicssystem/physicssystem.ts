import { Component, PhysicsBodyComponent } from "src/components";
import { log, LogLevel } from "../core/loggingsystem";
import { Message } from "../core/messagesystem";
import { PhysicsStream } from "../core/streams";
import { System } from "../core/system";

export class PhysicsSystem extends System {
    /**
     * Gets the PhysicsSystem instance.
     * @returns PhysicsSystem
     */
    public static get instance(): PhysicsSystem {
        return PhysicsSystem._instance;
    }
    /**
     * Gets all the PhysicsBodies in the PhysicsSystem.
     * @returns Map<string, PhysicsBodyComponent>
     */
    public static get physicsBodies(): Map<string, PhysicsBodyComponent> {
        return PhysicsSystem._instance._physicsBodies;
    }
    private static _instance: PhysicsSystem;
    private _physicsBodies: Map<string, PhysicsBodyComponent>;
    /**
     * Physics system constructor.
     */
    private constructor() {
        super("physicssystem");
        this._systemStream = new PhysicsStream();
        this._physicsBodies = new Map<string, PhysicsBodyComponent>();
        PhysicsSystem._instance = this;
    }
    /**
     * Initializes the PhysicsSystem to start.
     * @returns void
     */
    public static initialize({}: 
        {} = {}): void {
        new PhysicsSystem();
        PhysicsSystem._instance.start();
    }
    /**
     * Adds a PhysicsBodyComponent to the list of current PhysicsBodies.
     * @param  {Component} pb Converted to a PhysicsBodyComponent
     * @returns boolean
     */
    public static addPhysicsBody(id: string, pb: Component): boolean {
        PhysicsSystem._instance._physicsBodies.set(id, pb as PhysicsBodyComponent);
        return PhysicsSystem._instance._physicsBodies.size > 0;
    }
    /**
     * Cleans up the PhysicsSystem when it shutsdown.
     * @returns void
     */
    public cleanup(): void {
        this._physicsBodies = new Map<string, PhysicsBodyComponent>();
    }
    /**
     * Starts the PhysicsSystem.
     * @returns void
     */
    public start(): void {

    }
    /**
     * Called when the PhysicsSystem is stopped.
     * @returns void
     */
    public stop(): void {

    }
    /**
     * Called when the PhysicsSystem needs to cleanup and shutdown.
     * @returns void
     */
    public shutdown(): void {
        PhysicsSystem.instance.cleanup();
    }
    public update(delta: number): void {
        this._messageQueue.forEach((element) => {
            this.parseMessage(element);
        });
        this._messageQueue = new Array<Message>();
        this._physicsBodies.forEach((value, key) => {
            // TODO: REVIEW: Get the entity and apply the force.
            log(LogLevel.debug, `The force of ${value} has been applied to ${key}`);
        });
    }
    /**
     * The onMessage function called from the stream.
     * @param  {Message} message
     * @returns void
     */
    public onMessage(message: Message): void {
        this.parseMessage(message);
    }
    /**
     * Parses the message for the Physics System to handle properly.
     * @param  {Message} message
     * @returns void
     */
    public parseMessage(message: Message): void {
        log(LogLevel.debug, message.toString());
    }
}