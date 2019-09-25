import { log, LogLevel } from "de-loggingsystem";
import { Message, MessageType, IMessageHandler } from "../core/messagesystem";
import { Component } from "./component";
import { IComponentData } from "./icomponentdata";
import { IComponentBuilder } from "./icomponentbuilder";
import { IComponent } from "./icomponent";
import { PlayerBehaviour } from "src/behaviours";

export class ScoringComponent extends Component implements IMessageHandler {
    public static HIGHSCORE: number = 0;
    public static SCORE: number = 0;
    protected _timeCount: number = 0;
    private readonly _zoneScore: number = 5000;
    /**
     * Class constructor.
     * @param  {ScoringComponentData} data
     */
    public constructor(data: ScoringComponentData) {
        super(data);
        Message.subscribe(MessageType.ZONE_FINISHED, this);
    }
    /**
     * Loads the component.
     * @returns void
     */
    public load(): void {
        
    }
    public onMessage(message: Message): void {
        if (message.code === MessageType.ZONE_FINISHED) {
            this.addScore({lives: PlayerBehaviour.lives});
            log(LogLevel.info, `High Score: ${ScoringComponent.HIGHSCORE}`);
            log(LogLevel.info, `Current Score: ${ScoringComponent.SCORE}`);
        }
        if (message.code === MessageType.GAME_OVER) {
            if (ScoringComponent.HIGHSCORE < ScoringComponent.SCORE) {
                ScoringComponent.HIGHSCORE = ScoringComponent.SCORE;
                ScoringComponent.SCORE = 0;
            }
        }
        if (message.code === MessageType.ZONE_START) {
            this._timeCount = 0;
        }
    }
    /**
     * Updates the component.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        this._timeCount += delta;
        super.update(delta);
    }
    /**
     * Adds to the current score.
     * @returns void
     */
    private addScore({lives}: {lives?: number} = {}): void {
        let score = this._zoneScore;
        score = this._zoneScore - (Math.round(this._timeCount) * 100);
        ScoringComponent.SCORE += score;
        // TextComponent.TEXT.text = `Current Score: ${ScoringComponent.SCORE}`; 
        // TODO: Add scoring component and update
    }
}

export class ScoringComponentData implements IComponentData {
    public name!: string;
    /**
     * Class constructor
     * @param  {any} json
     */
    constructor(json: any) {
        this.setFromJson(json);
    }
    /**
     * Builds the component from JSON.
     * @param  {any} json
     * @returns IComponent
     */
    public setFromJson(json: any): void {
        if (json.name !== undefined) {
            this.name = json.name;
        }
    }
}

export class ScoringComponentBuilder implements IComponentBuilder {
    /**
     * Gets the type of component.
     * @returns string
     */
    public get type(): string {
        return "score";
    }
    /**
     * Builds the component from JSON.
     * @param  {any} json
     * @returns IComponent
     */
    public buildFromJson(json: any): IComponent {
        let data: ScoringComponentData = new ScoringComponentData(json);
        return new ScoringComponent(data);
    }
}