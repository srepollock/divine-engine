import { DObject } from "../core";
import { Matrix4, Vector3 } from "../math";

export class Camera {
    private _fieldOfView: number;
    private _projectionMatrix: Matrix4;
    private _transform: Vector3;
    private _zFar: number;
    private _zNear: number;
    public get fieldOfView(): number {
        return this._fieldOfView;
    }
    public set fieldOfView(fieldOfView: number) {
        this._fieldOfView = fieldOfView;
        this.recalculateProjectionMatrix();
    }
    public get projectionMatrix(): Matrix4 {
        return this._projectionMatrix;
    }
    public get transform(): Vector3 {
        return this._transform;
    }
    public set transofrm(v: Vector3) {
        this._transform = v;
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
        this._transform = new Vector3();
        // Creates a perspective matrix used to simulate distortion of perspective in a camera.
        // Field of view is default 45 degress * Math.PI / 180 (convert to Radians)
        this._fieldOfView = fieldOfView * Math.PI / 180;
        // Display objects between default 0.1
        this._zNear = zNear;
        // and default 100 units away from the camera
        this._zFar = zFar; 
        this._projectionMatrix = new Matrix4();
        // Sets projection matrix to a perspective matrix with field of view, aspect, znear, zfar taken into account.
        this._projectionMatrix.perspective(this._fieldOfView, this._zNear, this._zFar);
    }
    public recalculateProjectionMatrix(): Matrix4 {
        this._projectionMatrix = new Matrix4();
        // Sets projection matrix to a perspective matrix with field of view, aspect, znear, zfar taken into account.
        this._projectionMatrix.perspective(this._fieldOfView, this._zNear, this._zFar);
        return this._projectionMatrix;
    }
}