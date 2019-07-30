import { mat4 } from "gl-matrix";
import { Entity, GameWindow } from "src/core";
import { Vector3 } from "src/math";

export class Camera extends Entity {
    private _aspect: number;
    private _fieldOfView: number;
    private _projectionMatrix: mat4;
    private _zFar: number;
    private _zNear: number;
    public get aspect(): number {
        return this._aspect;
    }
    public set aspect(aspect: number) {
        this._aspect = aspect;
        this.recalculateProjectionMatrix();
    }
    public get fieldOfView(): number {
        return this._fieldOfView;
    }
    public set fieldOfView(fieldOfView: number) {
        this._fieldOfView = fieldOfView;
        this.recalculateProjectionMatrix();
    }
    public get projectionMatrix(): mat4 {
        return this._projectionMatrix;
    }
    public get zFar(): number {
        return this._zFar;
    }
    public set zFar(zFar: number) {
        this._zFar = zFar;
        this.recalculateProjectionMatrix();
    }
    public get zNear(): number {
        return this._zNear;
    }
    public set zNear(zNear: number) {
        this._zNear = zNear;
        this.recalculateProjectionMatrix();
    }
    constructor(fieldOfView: number = 45, zNear: number = 0.1, zFar: number = 100.0) {
        super({name: "MainCamera", tag: "camera", transform: new Vector3()});
        // Creates a perspective matrix used to simulate distortion of perspective in a camera.
        // Field of view is default 45 degress * Math.PI / 180 (convert to Radians)
        this._fieldOfView = fieldOfView * Math.PI / 180;
        // An aspect ratio matching the screen.
        this._aspect = GameWindow.width / GameWindow.height;
        // Display objects between default 0.1
        this._zNear = zNear;
        // and default 100 units away from the camera
        this._zFar = zFar; 
        this._projectionMatrix = mat4.create();
        // Sets projection matrix to a perspective matrix with field of view, aspect, znear, zfar taken into account.
        mat4.perspective(this._projectionMatrix, this._fieldOfView, this._aspect, this._zNear, this._zFar);
    }
    public recalculateProjectionMatrix(): mat4 {
        this._projectionMatrix = mat4.create();
        // Sets projection matrix to a perspective matrix with field of view, aspect, znear, zfar taken into account.
        mat4.perspective(this._projectionMatrix, this._fieldOfView, this._aspect, this._zNear, this._zFar);
        return this._projectionMatrix;
    }
}