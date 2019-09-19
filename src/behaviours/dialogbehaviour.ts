import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { SpriteComponent } from "../components/spritecomponent";
import { SpriteComponentData } from "../components/spritecomponentdata";
import { Behaviour } from "./behaviour";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { IBehaviourData } from "./ibehaviourdata";

export class Dialog {
    constructor(
        public materialName: string = "",
        public startTime: number = 0,
        public duration: number = 0
    ) {

    }
}

export class DialogBehaviour extends Behaviour {
    private _spriteName: string;
    private _sprite: SpriteComponent | undefined;
    private _dialogs: Array<Dialog> = new Array();
    private _totalTime: number = 0;
    private _timeCount: number = 0;
    private _dialogIndex: number = 0;
    private _started: boolean = false;
    private _running: boolean = false;
    public get dialogIndex(): number {
        return this._dialogIndex;
    }
    public set dialogIndex(value: number) {
        this._dialogIndex = value;
    }
    public get dialogs(): Array<Dialog> {
        return this._dialogs;
    }
    constructor(data: DialogBehaviourData) {
        super(data);
        this._spriteName = data.spriteName;
        this._dialogs = data.dialogs;
    }
    public updateReady(): void {
        super.updateReady();
        this._sprite = this._owner!.getComponentByName(this._spriteName) as SpriteComponent;
        if (this._sprite === undefined) {
            log(LogLevel.error, 
                `Sprite named: ${this._spriteName} is not attached to the component owner.`,
                ErrorCode.SpriteNotAttached);
        }
        this._owner!.isVisible = false;
    }
    public update(delta: number): void {
        this._totalTime += delta;
        this._timeCount += delta;
        if (this._dialogIndex !== -1 && !(this._dialogIndex === this._dialogs.length)
            && this._totalTime >= this._dialogs[this._dialogIndex].startTime) {
            this._owner!.isVisible = true;
            this.changeSprite(this._dialogs[this._dialogIndex].materialName);
            this._running = true;
        }
        if (this._running) {
            if (this._timeCount >= this._dialogs[this._dialogIndex].duration) {
                this._timeCount = 0;
                this._dialogIndex += 1;
            }
            if (this._dialogIndex >= this._dialogs.length) {
                this._owner!.isVisible = false;
                this._running = false;
                this._dialogIndex = this._dialogs.length - 1;
                this._timeCount = 0;
            }
        }
        super.update(delta); 
    }
    private changeSprite(materialName: string): void {
        let newSpriteComponent = new SpriteComponent(
            new SpriteComponentData(JSON.parse(JSON.stringify({
                name: this._spriteName,
                type: "sprite",
                materialName: materialName
            })))
        );
        this._owner!.removeComponent(this._sprite!.name);
        this._owner!.addComponent(newSpriteComponent);
        this._sprite = this._owner!.getComponentByName(this._spriteName) as SpriteComponent;
        this._sprite.load();
    }
}

export class DialogBehaviourData implements IBehaviourData {
    public name!: string;
    public spriteName!: string;
    public materialName!: string;
    public sprite: SpriteComponent | undefined;
    public dialogIndex: number = 0;
    public dialogs: Array<Dialog> = new Array();
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.name = String(json.name);
        if (json.spriteName === undefined) {
            log(LogLevel.error, `Behaviour name must be specified.`, ErrorCode.NoName);
        } else {
            this.spriteName = json.spriteName;
        }
        if (json.dialogs === undefined) {
            log(LogLevel.error, `Dialogs have not been defined for the sequence behaviour.`, ErrorCode.NoActions);
        } else {
            json.dialogs.forEach((element: Dialog) => {
                let materialName = String(element.materialName);
                let startTime = Number(element.startTime);
                let duration = Number(element.duration);
                this.dialogs.push({materialName, startTime, duration});
            });
        }
    }
}

export class DialogBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    public get type(): string {
        return "dialog";
    }
    public buildFromJson(json: any): IBehaviour {
        let data = new DialogBehaviourData();
        data.setFromJson(json);
        return new DialogBehaviour(data);
    }
}