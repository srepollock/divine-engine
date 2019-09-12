import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { AssetManager } from "../assets/assetmanager";
import { JsonAsset } from "../assets/jsonasset";
import { IMessageHandler } from "../core/messagesystem/imessagehandler";
import { Message } from "../core/messagesystem/message";
import { Shader } from "../rendersystem/shader";
import { Zone } from "./zone";

export class ZoneManager implements IMessageHandler {
    private static _instance: ZoneManager;
    private static _registeredZonesCount: number = -1;
    private static _zoneCounter: number = -1;
    private static _registeredZones: Map<number, string> = new Map();
    private static _activeZone: Zone | undefined;
    public static get activeZoneIndex(): number {
        return ZoneManager._activeZone!.index;
    }
    public static get instance(): ZoneManager {
        return ZoneManager._instance;
    }
    private constructor() {
        ZoneManager._instance = this;
    }
    public static getRegisteredZoneIndex(zoneName: string): number | undefined {
        for (let [key, value] of ZoneManager._registeredZones.entries()) {
            if (value.includes(zoneName)) {
                return key;
            }
        }
        return undefined;
    }
    public static initialize(): void {
        new ZoneManager();
    }
    public static changeZone(index: number): void {
        log(LogLevel.debug, `Changing zone to: ${ZoneManager._registeredZones.get(index)}.`);
        if (ZoneManager._activeZone !== undefined) {
            ZoneManager._activeZone.onDeactivated(); // REVIEW: unsubscribe
            ZoneManager._activeZone.unload(); // REVIEW: unsubscribe?
            ZoneManager._activeZone = undefined;
        }
        if (ZoneManager._registeredZones.get(index) !== undefined) {
            if (AssetManager.isAssetLoaded(ZoneManager._registeredZones.get(index)!)) {
                let asset = AssetManager.getAsset(ZoneManager._registeredZones.get(index)!);
                ZoneManager.loadZone(asset!);
            } else {
                Message.subscribe(AssetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + 
                    ZoneManager._registeredZones.get(index), ZoneManager._instance);
                AssetManager.loadAsset(ZoneManager._registeredZones.get(index)!);
            }
        } else {
            log(LogLevel.error, `Zone ID ${index} does not exist.`, ErrorCode.ZoneDoesNotExist);
        }
    }
    public static update(delta: number): void {
        if (ZoneManager._activeZone !== undefined) {
            ZoneManager._activeZone.update(delta);
        }
    }
    public static registerZone(path: string): void {
        ZoneManager._registeredZones.set(++ZoneManager._registeredZonesCount, path);
    }
    public static render(shader: Shader): void {
        if (ZoneManager._activeZone !== undefined) {
            ZoneManager._activeZone.render(shader);
        }
    }
    private static loadZone(asset: JsonAsset): void {
        let zoneData = asset.data;
        let zoneIndex: number = ++ZoneManager._zoneCounter;
        if (zoneData.index !== undefined) {
            zoneIndex = Number(zoneData.index);
        }
        let zoneName!: string;
        if (zoneData.name === undefined) {
            log(LogLevel.error, `Zone name not valid.`, ErrorCode.NoName);
        } else {
            zoneName = String(zoneData.name);
        }
        let zoneDescription!: string;
        if (zoneData.description === undefined) {
            log(LogLevel.error, `Zone description not valid.`, ErrorCode.ZoneDescription);
        } else {
            zoneDescription = String(zoneData.description);
        }
        ZoneManager._activeZone = new Zone({index: zoneIndex, name: zoneName, description: zoneDescription});
        ZoneManager._activeZone.initialize(zoneData);
        ZoneManager._activeZone!.onActivated();
        ZoneManager._activeZone!.load();
    }
    public onMessage(message: Message): void {
        if (message.code.indexOf(AssetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED) !== undefined) {
            let asset = message.context as JsonAsset;
            ZoneManager.loadZone(asset);
        }
    }
}