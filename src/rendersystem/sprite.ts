import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";
import { Material } from "../core/material";
import { Matrix4, } from "../math/matrix4";
import { Vector3 } from "../math/vector3";
import { Vertex } from "../math/vertex";
import { AttributeInfo } from "../rendersystem/attributeinfo";
import { GLBuffer } from "../rendersystem/GLBuffer";
import { GLUtility } from "../rendersystem/glutility";
import { MaterialManager } from "../rendersystem/materialmanager";
import { Shader } from "../rendersystem/shader";

export class Sprite {
    protected _name: string;
    protected _height: number;
    protected _width: number;
    protected _vertices: Array<Vertex> = new Array();
    protected _buffer: GLBuffer | undefined;
    protected _materialName: string | undefined;
    protected _material: Material | undefined;
    protected _origin: Vector3 = new Vector3(0.5, 0.5);
    public get name(): string {
        return this._name;
    }
    public get origin(): Vector3 {
        return this._origin;
    }
    public set origin(value: Vector3) {
        this._origin = value;
        this.recalculateVertices();
    }
    constructor(name: string, materialName: string, width: number = 100, height: number = 100) {
        this._name = name;
        this._height = height;
        this._width = width;
        this._materialName = materialName;
        this._material = MaterialManager.getMaterial(this._materialName)!;
    }
    public destroy(): void {
        this._buffer!.destroy();
        MaterialManager.releaseMaterial(this._materialName!);
        this._material = undefined;
        this._materialName = undefined;
    }
    public draw(shader: Shader, model: Matrix4): void {
        let colorLocation = shader.getUniformLocation("u_tint");
        GLUtility.gl.uniform4fv(colorLocation, this._material!.tint.toFloat32Array());
        let modelLocation = shader.getUniformLocation("u_model");
        GLUtility.gl.uniformMatrix4fv(modelLocation, false, model.matrix);
        if (this._material!.diffuseTexture !== undefined) {
            this._material!.diffuseTexture.activateAndBind(0);
            let diffuseLocation = shader.getUniformLocation("u_diffuse");
            GLUtility.gl.uniform1i(diffuseLocation, 0);
        }
        this._buffer!.bind();
        this._buffer!.draw();
    }
    public load(): void {
        this._buffer = new GLBuffer();
        if (this._buffer === null) { 
            log(LogLevel.error, "WebGLBuffer is null.", ErrorCode.WebGLBuffer);
        }
        let positionAttribute: AttributeInfo = new AttributeInfo(0, 3);
        this._buffer.addAttributeLocation(positionAttribute);
        let textureCoordAttribute: AttributeInfo = new AttributeInfo(1, 2);
        this._buffer.addAttributeLocation(textureCoordAttribute);
        this.calculateVertices();
        this._vertices.forEach((v) => {
            this._buffer!.push(v.toArray());
        });
        this._buffer.unbind();
    }
    public update(delta: number): void {
        
    }
    protected calculateVertices(): void {
        let minX = -(this._width * this._origin.x);
        let maxX = this._width * (1.0 - this._origin.x);
        let minY = -(this._height * this._origin.y);
        let maxY = this._height * (1.0 - this._origin.y);

        this._vertices = [
            new Vertex(minX, minY, 0, 0, 0), // x, y, z, u, v
            new Vertex(minX, maxY, 0, 0, 1.0),
            new Vertex(maxX, maxY, 0, 1.0, 1.0),
            new Vertex(maxX, maxY, 0, 1.0, 1.0),
            new Vertex(maxX, minY, 0, 1.0, 0),
            new Vertex(minX, minY, 0, 0, 0)
        ];
    }
    protected recalculateVertices(): void {
        let minX = -(this._width * this._origin.x);
        let maxX = this._width * (1.0 * this._origin.x);
        let minY = -(this._height * this._origin.y);
        let maxY = this._height * (1.0 * this._origin.y);
        this._vertices[0].position.set({x: minX, y: minY});
        this._vertices[1].position.set({x: minX, y: maxY});
        this._vertices[2].position.set({x: maxX, y: maxY});
        this._vertices[3].position.set({x: maxX, y: maxY});
        this._vertices[4].position.set({x: maxX, y: minY});
        this._vertices[5].position.set({x: minX, y: minY});
        this._buffer!.clear();
        this._vertices.forEach((v) => {
            this._buffer!.push(v.toArray());
        });
        this._buffer!.unbind();
    }
}