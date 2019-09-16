import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { AttributeInfo } from "./attributeinfo";
import { GLUtility } from "./glutility";

export class GLBuffer {
    private _hasAttributeLocation: boolean = false;
    private _attributes: Array<AttributeInfo> = new Array();
    private _elementSize: number;
    private _stride: number;
    private _buffer: WebGLBuffer;
    private _targetBufferType: number;
    private _dataType: number;
    private _mode: number;
    private _typeSize: number = 0;
    private _data: Array<number> = new Array();
    /**
     * Class constructor.
     * @param  {number=GLUtility.gl.FLOAT} dataType
     * @param  {number=GLUtility.gl.ARRAY_BUFFER} targetBufferType
     * @param  {number=GLUtility.gl.TRIANGLES} mode
     */
    constructor(dataType: number = GLUtility.gl.FLOAT, 
        targetBufferType: number = GLUtility.gl.ARRAY_BUFFER, 
        mode: number = GLUtility.gl.TRIANGLES) {
        this._elementSize = 0;
        this._dataType = dataType;
        this._targetBufferType = targetBufferType;
        this._mode = mode;
        switch (this._dataType) {
            case GLUtility.gl.FLOAT:
            case GLUtility.gl.INT:
            case GLUtility.gl.UNSIGNED_INT:
                this._typeSize = 4;
                break;
            case GLUtility.gl.SHORT:
            case GLUtility.gl.UNSIGNED_SHORT:
                this._typeSize = 2;
                break;
            case GLUtility.gl.BYTE:
            case GLUtility.gl.UNSIGNED_BYTE:
                this._typeSize = 1;
                break;
            default:
                log(LogLevel.error, `Unrecognized data type for (${dataType.toString}).`, 
                    ErrorCode.DataTypeNotRecognized);
        }
        this._stride = this._elementSize * this._typeSize;
        let tempBuffer = GLUtility.gl.createBuffer();
        if (tempBuffer === null) log(LogLevel.error, `No WebGL buffer was created.`, ErrorCode.WebGLBufferNotCreated);
        this._buffer = tempBuffer!;
    }
    /**
     * Adds an attribute location to the buffer.
     * @param  {AttributeInfo} info
     * @returns void
     */
    public addAttributeLocation(info: AttributeInfo): void {
        this._hasAttributeLocation = true;
        info.offset = this._elementSize;
        this._attributes.push(info);
        this._elementSize += info.size;
        this._stride = this._elementSize * this._typeSize;
    }
    /**
     * Binds the current buffer to read or write from.
     * @param  {boolean=false} normalize
     * @returns void
     */
    public bind(normalize: boolean = false): void {
        GLUtility.gl.bindBuffer(this._targetBufferType, this._buffer);
        if (this._hasAttributeLocation) {
            this._attributes.forEach((attribute: AttributeInfo) => {
                GLUtility.gl.vertexAttribPointer(attribute.location, attribute.size, this._dataType, normalize, 
                    this._stride, attribute.offset * this._typeSize);
                GLUtility.gl.enableVertexAttribArray(attribute.location);
            });
        }
    }
    /**
     * Draws the data in the buffer.
     * @returns void
     */
    public draw(): void {
        if (this._targetBufferType === GLUtility.gl.ARRAY_BUFFER) {
            GLUtility.gl.drawArrays(this._mode, 0, this._data.length / this._elementSize);
        } else if (this._targetBufferType === GLUtility.gl.ELEMENT_ARRAY_BUFFER) {
            GLUtility.gl.drawElements(this._mode, this._data.length, this._dataType, 0);
        }
    }
    /**
     * Pushes data to the buffer.
     * @param  {number[]} data
     * @returns void
     */
    public push(data: number[]): void {
        data.forEach(n => {
            this._data.push(n);
        });
        GLUtility.gl.bindBuffer(this._targetBufferType, this._buffer);
        let bufferData: ArrayBuffer;
        switch (this._dataType) {
            case GLUtility.gl.FLOAT:
                bufferData = new Float32Array(this._data);
                break;
            case GLUtility.gl.INT:
                bufferData = new Int32Array(this._data);
                break;
            case GLUtility.gl.UNSIGNED_INT:
                bufferData = new Uint32Array(this._data);
                break;
            case GLUtility.gl.SHORT:
                bufferData = new Int16Array(this._data);
                break;
            case GLUtility.gl.UNSIGNED_SHORT:
                bufferData = new Uint16Array(this._data);
                break;
            case GLUtility.gl.BYTE:
                bufferData = new Int8Array(this._data);
                break;
            case GLUtility.gl.UNSIGNED_BYTE:
                bufferData = new Uint8Array(this._data);
                break;
        }
        GLUtility.gl.bufferData(this._targetBufferType, bufferData!, GLUtility.gl.STATIC_DRAW);
    }
    /**
     * Clears the current buffer.
     * @returns void
     */
    public clear(): void {
        this._data.length = 0;
    }
    /**
     * Sets the data of the buffer.
     * @param  {Array<number>} data
     * @returns void
     */
    public setData(data: Array<number>): void {
        this.clear();
        this.push(data);
    }
    /**
     * Unbinds the buffer.
     * @returns void
     */
    public unbind(): void {
        if (this._hasAttributeLocation) {
            this._attributes.forEach(attribute => {
                GLUtility.gl.disableVertexAttribArray(attribute.location);
            });
        }
        GLUtility.gl.bindBuffer(this._targetBufferType, null);
    }
    /**
     * Destroys the buffer.
     * @returns void
     */
    public destroy(): void {
        GLUtility.gl.deleteBuffer(this._buffer);
    }
}