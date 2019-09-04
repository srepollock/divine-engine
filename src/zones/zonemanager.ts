import { AssetManager } from "../assets/assetmanager";
import { JsonAsset } from "../assets/jsonasset";
import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";
import { IMessageHandler } from "../core/messagesystem/imessagehandler";
import { Message } from "../core/messagesystem/message";
import { Shader } from "../rendersystem/shader";
import { Zone } from "./zone";

export class ZoneManager implements IMessageHandler {
    private static _instance: ZoneManager;
    private static _registeredZonesCount: number = -1;
    private static _registeredZones: Map<number, string> = new Map();
    private static _activeZone: Zone | undefined;
    private constructor() {
        ZoneManager._instance = this;
    }
    public static initialize(): void {
        new ZoneManager();
    }
    public static changeZone(index: number): void {
        if (ZoneManager._activeZone !== undefined) {
            ZoneManager._activeZone.onDeactivated();
            ZoneManager._activeZone.unload();
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
        let zoneID!: number;
        if (zoneData.id === undefined) {
            log(LogLevel.error, `Zone ID not valid.`, ErrorCode.ZoneID);
        } else {
            zoneID = Number(zoneData.id);
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
        ZoneManager._activeZone = new Zone({index: zoneID, name: zoneName, description: zoneDescription});
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