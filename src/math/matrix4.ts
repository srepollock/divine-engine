export class Matrix4 {
    private _matrix: Float32Array = new Float32Array(16);
    public get matrix(): Float32Array {
        return this._matrix;
    }
    constructor() {
        this._matrix = this.identity();
    }
    /**
     * Identity matrix (Basic)
     * |1 0 0 0|
     * |0 1 0 0|
     * |0 0 1 0|
     * |0 0 0 0|
     * @returns Float32Array
     */
    public identity(): Float32Array {
        let matrix = new Float32Array(16);
        matrix[0] = 1;
        matrix[1] = 0;
        matrix[2] = 0;
        matrix[3] = 0;
        matrix[4] = 0;
        matrix[5] = 1;
        matrix[6] = 0;
        matrix[7] = 0;
        matrix[8] = 0;
        matrix[9] = 0;
        matrix[10] = 1;
        matrix[11] = 0;
        matrix[12] = 0;
        matrix[13] = 0;
        matrix[14] = 0;
        matrix[15] = 0;
        return matrix;
    }
    /**
     * Copies the matrix given to the matrix called on.
     * @param  {Matrix4} m
     * @returns Matrix
     */
    public copy(m: Matrix4): Matrix4 {
        let i = 0;
        m.matrix.forEach((value) => {
            this._matrix[i++] = value;
        });
        return this;
    }
    /**
     * Sets the matrix called on with the given values.
     * @param  {number} m00
     * @param  {number} m01
     * @param  {number} m02
     * @param  {number} m03
     * @param  {number} m10
     * @param  {number} m11
     * @param  {number} m12
     * @param  {number} m13
     * @param  {number} m20
     * @param  {number} m21
     * @param  {number} m22
     * @param  {number} m23
     * @param  {number} m30
     * @param  {number} m31
     * @param  {number} m32
     * @param  {number} m33
     * @returns Matrix4
     */
    public set(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, 
        m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, 
        m33: number): Matrix4 {
        this._matrix[0] = m00;
        this._matrix[1] = m01;
        this._matrix[2] = m02;
        this._matrix[3] = m03;
        this._matrix[4] = m10;
        this._matrix[5] = m11;
        this._matrix[6] = m12;
        this._matrix[7] = m13;
        this._matrix[8] = m20;
        this._matrix[9] = m21;
        this._matrix[10] = m22;
        this._matrix[11] = m23;
        this._matrix[12] = m30;
        this._matrix[13] = m31;
        this._matrix[14] = m32;
        this._matrix[15] = m33;
        return this;
    }
    /**
     * Adds the given matrix to the matrix called on.
     * @param  {Matrix4} m
     * @returns Matrix
     */
    public add(m: Matrix4): Matrix4 {
        this._matrix[0] += m._matrix[0];
        this._matrix[1] += m._matrix[1];
        this._matrix[2] += m._matrix[2];
        this._matrix[3] += m._matrix[3];
        this._matrix[4] += m._matrix[4];
        this._matrix[5] += m._matrix[5];
        this._matrix[6] += m._matrix[6];
        this._matrix[7] += m._matrix[7];
        this._matrix[8] += m._matrix[8];
        this._matrix[9] += m._matrix[9];
        this._matrix[10] += m._matrix[10];
        this._matrix[11] += m._matrix[11];
        this._matrix[12] += m._matrix[12];
        this._matrix[13] += m._matrix[13];
        this._matrix[14] += m._matrix[14];
        this._matrix[15] += m._matrix[15];
        return this;
    }
    /**
     * Subtracts the given matrix to the matrix called on.
     * @param  {Matrix4} m
     * @returns Matrix
     */
    public subtract(m: Matrix4): Matrix4 {
        this._matrix[0] -= m._matrix[0];
        this._matrix[1] -= m._matrix[1];
        this._matrix[2] -= m._matrix[2];
        this._matrix[3] -= m._matrix[3];
        this._matrix[4] -= m._matrix[4];
        this._matrix[5] -= m._matrix[5];
        this._matrix[6] -= m._matrix[6];
        this._matrix[7] -= m._matrix[7];
        this._matrix[8] -= m._matrix[8];
        this._matrix[9] -= m._matrix[9];
        this._matrix[10] -= m._matrix[10];
        this._matrix[11] -= m._matrix[11];
        this._matrix[12] -= m._matrix[12];
        this._matrix[13] -= m._matrix[13];
        this._matrix[14] -= m._matrix[14];
        this._matrix[15] -= m._matrix[15];
        return this;
    }
    /**
     * Scales the called on matrix by the given matrix.
     * @param  {Matrix4} m
     * @returns Matrix
     */
    public scalar(m: Matrix4): Matrix4 {
        this._matrix[0] *= m._matrix[0];
        this._matrix[1] *= m._matrix[1];
        this._matrix[2] *= m._matrix[2];
        this._matrix[3] *= m._matrix[3];
        this._matrix[4] *= m._matrix[4];
        this._matrix[5] *= m._matrix[5];
        this._matrix[6] *= m._matrix[6];
        this._matrix[7] *= m._matrix[7];
        this._matrix[8] *= m._matrix[8];
        this._matrix[9] *= m._matrix[9];
        this._matrix[10] *= m._matrix[10];
        this._matrix[11] *= m._matrix[11];
        this._matrix[12] *= m._matrix[12];
        this._matrix[13] *= m._matrix[13];
        this._matrix[14] *= m._matrix[14];
        this._matrix[15] *= m._matrix[15];
        return this;
    }
    /**
     * Inverts the matrix called on.
     * @returns Matrix
     */
    public invert(): Matrix4 {
        let temp: Float32Array = new Float32Array(16);
        temp[0] = this._matrix[5]  * this._matrix[10] * this._matrix[15] - 
             this._matrix[5]  * this._matrix[11] * this._matrix[14] - 
             this._matrix[9]  * this._matrix[6]  * this._matrix[15] + 
             this._matrix[9]  * this._matrix[7]  * this._matrix[14] +
             this._matrix[13] * this._matrix[6]  * this._matrix[11] - 
             this._matrix[13] * this._matrix[7]  * this._matrix[10];
        temp[1] = -this._matrix[1]  * this._matrix[10] * this._matrix[15] + 
             this._matrix[1]  * this._matrix[11] * this._matrix[14] + 
             this._matrix[9]  * this._matrix[2] * this._matrix[15] - 
             this._matrix[9]  * this._matrix[3] * this._matrix[14] - 
             this._matrix[13] * this._matrix[2] * this._matrix[11] + 
             this._matrix[13] * this._matrix[3] * this._matrix[10];
        temp[2] = this._matrix[1]  * this._matrix[6] * this._matrix[15] - 
             this._matrix[1]  * this._matrix[7] * this._matrix[14] - 
             this._matrix[5]  * this._matrix[2] * this._matrix[15] + 
             this._matrix[5]  * this._matrix[3] * this._matrix[14] + 
             this._matrix[13] * this._matrix[2] * this._matrix[7] - 
             this._matrix[13] * this._matrix[3] * this._matrix[6];
        temp[3] = -this._matrix[1] * this._matrix[6] * this._matrix[11] + 
             this._matrix[1] * this._matrix[7] * this._matrix[10] + 
             this._matrix[5] * this._matrix[2] * this._matrix[11] - 
             this._matrix[5] * this._matrix[3] * this._matrix[10] - 
             this._matrix[9] * this._matrix[2] * this._matrix[7] + 
             this._matrix[9] * this._matrix[3] * this._matrix[6];
        temp[4] = -this._matrix[4]  * this._matrix[10] * this._matrix[15] + 
            this._matrix[4]  * this._matrix[11] * this._matrix[14] + 
            this._matrix[8]  * this._matrix[6]  * this._matrix[15] - 
            this._matrix[8]  * this._matrix[7]  * this._matrix[14] - 
            this._matrix[12] * this._matrix[6]  * this._matrix[11] + 
            this._matrix[12] * this._matrix[7]  * this._matrix[10];
        temp[5] = this._matrix[0]  * this._matrix[10] * this._matrix[15] - 
             this._matrix[0]  * this._matrix[11] * this._matrix[14] - 
             this._matrix[8]  * this._matrix[2] * this._matrix[15] + 
             this._matrix[8]  * this._matrix[3] * this._matrix[14] + 
             this._matrix[12] * this._matrix[2] * this._matrix[11] - 
             this._matrix[12] * this._matrix[3] * this._matrix[10];
        temp[6] = -this._matrix[0]  * this._matrix[6] * this._matrix[15] + 
             this._matrix[0]  * this._matrix[7] * this._matrix[14] + 
             this._matrix[4]  * this._matrix[2] * this._matrix[15] - 
             this._matrix[4]  * this._matrix[3] * this._matrix[14] - 
             this._matrix[12] * this._matrix[2] * this._matrix[7] + 
             this._matrix[12] * this._matrix[3] * this._matrix[6];
        temp[7] = this._matrix[0] * this._matrix[6] * this._matrix[11] - 
             this._matrix[0] * this._matrix[7] * this._matrix[10] - 
             this._matrix[4] * this._matrix[2] * this._matrix[11] + 
             this._matrix[4] * this._matrix[3] * this._matrix[10] + 
             this._matrix[8] * this._matrix[2] * this._matrix[7] - 
             this._matrix[8] * this._matrix[3] * this._matrix[6];
        temp[8] = this._matrix[4]  * this._matrix[9] * this._matrix[15] - 
            this._matrix[4]  * this._matrix[11] * this._matrix[13] - 
            this._matrix[8]  * this._matrix[5] * this._matrix[15] + 
            this._matrix[8]  * this._matrix[7] * this._matrix[13] + 
            this._matrix[12] * this._matrix[5] * this._matrix[11] - 
            this._matrix[12] * this._matrix[7] * this._matrix[9];
        temp[9] = -this._matrix[0]  * this._matrix[9] * this._matrix[15] + 
            this._matrix[0]  * this._matrix[11] * this._matrix[13] + 
            this._matrix[8]  * this._matrix[1] * this._matrix[15] - 
            this._matrix[8]  * this._matrix[3] * this._matrix[13] - 
            this._matrix[12] * this._matrix[1] * this._matrix[11] + 
            this._matrix[12] * this._matrix[3] * this._matrix[9];
        temp[10] = this._matrix[0]  * this._matrix[5] * this._matrix[15] - 
            this._matrix[0]  * this._matrix[7] * this._matrix[13] - 
            this._matrix[4]  * this._matrix[1] * this._matrix[15] + 
            this._matrix[4]  * this._matrix[3] * this._matrix[13] + 
            this._matrix[12] * this._matrix[1] * this._matrix[7] - 
            this._matrix[12] * this._matrix[3] * this._matrix[5];
        temp[11] = -this._matrix[0] * this._matrix[5] * this._matrix[11] + 
            this._matrix[0] * this._matrix[7] * this._matrix[9] + 
            this._matrix[4] * this._matrix[1] * this._matrix[11] - 
            this._matrix[4] * this._matrix[3] * this._matrix[9] - 
            this._matrix[8] * this._matrix[1] * this._matrix[7] + 
            this._matrix[8] * this._matrix[3] * this._matrix[5];
        temp[12] = -this._matrix[4]  * this._matrix[9] * this._matrix[14] + 
            this._matrix[4]  * this._matrix[10] * this._matrix[13] +
            this._matrix[8]  * this._matrix[5] * this._matrix[14] - 
            this._matrix[8]  * this._matrix[6] * this._matrix[13] - 
            this._matrix[12] * this._matrix[5] * this._matrix[10] + 
            this._matrix[12] * this._matrix[6] * this._matrix[9];
        temp[13] = this._matrix[0]  * this._matrix[9] * this._matrix[14] - 
            this._matrix[0]  * this._matrix[10] * this._matrix[13] - 
            this._matrix[8]  * this._matrix[1] * this._matrix[14] + 
            this._matrix[8]  * this._matrix[2] * this._matrix[13] + 
            this._matrix[12] * this._matrix[1] * this._matrix[10] - 
            this._matrix[12] * this._matrix[2] * this._matrix[9];
        temp[14] = -this._matrix[0]  * this._matrix[5] * this._matrix[14] + 
            this._matrix[0]  * this._matrix[6] * this._matrix[13] + 
            this._matrix[4]  * this._matrix[1] * this._matrix[14] - 
            this._matrix[4]  * this._matrix[2] * this._matrix[13] - 
            this._matrix[12] * this._matrix[1] * this._matrix[6] + 
            this._matrix[12] * this._matrix[2] * this._matrix[5];
        temp[15] = this._matrix[0] * this._matrix[5] * this._matrix[10] - 
            this._matrix[0] * this._matrix[6] * this._matrix[9] - 
            this._matrix[4] * this._matrix[1] * this._matrix[10] + 
            this._matrix[4] * this._matrix[2] * this._matrix[9] + 
            this._matrix[8] * this._matrix[1] * this._matrix[6] - 
            this._matrix[8] * this._matrix[2] * this._matrix[5];
        
        let det = this._matrix[0] * temp[0] + this._matrix[1] * temp[4] + this._matrix[2] * temp[8] + this._matrix[3] 
            * temp[12];
        if (det === 0) {
            return this;
        }
        det = 1.0 / det;
        for (let i = 0; i < 16; i++) {
            this._matrix[i] = temp[i] * det;
        }
        return this;
    }
    /**
     * Multiplies the matrix called on by the given.
     * @param  {Matrix4} m
     * @returns Matrix
     */
    public multiply(m: Matrix4): Matrix4 {
        // tslint:disable-next-line: one-variable-per-declaration
        let a00 = this._matrix[0],
            a01 = this._matrix[1],
            a02 = this._matrix[2],
            a03 = this._matrix[3],
            a10 = this._matrix[4],
            a11 = this._matrix[5],
            a12 = this._matrix[6],
            a13 = this._matrix[7],
            a20 = this._matrix[8],
            a21 = this._matrix[9],
            a22 = this._matrix[10],
            a23 = this._matrix[11],
            a30 = this._matrix[12],
            a31 = this._matrix[13],
            a32 = this._matrix[14],
            a33 = this._matrix[15];
        // tslint:disable-next-line: one-variable-per-declaration
        let b00 = m._matrix[0],
            b01 = m._matrix[1],
            b02 = m._matrix[2],
            b03 = m._matrix[3],
            b10 = m._matrix[4],
            b11 = m._matrix[5],
            b12 = m._matrix[6],
            b13 = m._matrix[7],
            b20 = m._matrix[8],
            b21 = m._matrix[9],
            b22 = m._matrix[10],
            b23 = m._matrix[11],
            b30 = m._matrix[12],
            b31 = m._matrix[13],
            b32 = m._matrix[14],
            b33 = m._matrix[15];
        this._matrix[0] = this.dotProduct(a00, b00, a01, b10, a02, b20, a03, b30);
        this._matrix[1] = this.dotProduct(a00, b01, a01, b11, a02, b21, a03, b31);
        this._matrix[2] = this.dotProduct(a00, b02, a01, b12, a02, b22, a03, b32);
        this._matrix[3] = this.dotProduct(a00, b03, a01, b13, a02, b23, a03, b33);
        this._matrix[4] = this.dotProduct(a10, b00, a11, b10, a12, b20, a13, b30);
        this._matrix[5] = this.dotProduct(a10, b10, a11, b11, a12, b21, a13, b31);
        this._matrix[6] = this.dotProduct(a10, b20, a11, b12, a12, b22, a13, b32);
        this._matrix[7] = this.dotProduct(a10, b30, a11, b13, a12, b23, a13, b33);
        this._matrix[8] = this.dotProduct(a20, b00, a21, b10, a22, b20, a23, b30);
        this._matrix[9] = this.dotProduct(a20, b01, a21, b11, a22, b21, a23, b31);
        this._matrix[10] = this.dotProduct(a20, b02, a21, b12, a22, b22, a23, b32);
        this._matrix[11] = this.dotProduct(a20, b03, a21, b13, a22, b23, a23, b33);
        this._matrix[12] = this.dotProduct(a30, b00, a31, b10, a32, b20, a33, b30);
        this._matrix[13] = this.dotProduct(a30, b01, a31, b11, a32, b21, a33, b31);
        this._matrix[14] = this.dotProduct(a30, b02, a31, b12, a32, b22, a33, b32);
        this._matrix[15] = this.dotProduct(a30, b03, a31, b13, a32, b23, a33, b33);
        return this;
    }
    /**
     * Changes the called on matrix to a perspective matrix with the given values.
     * @param  {number} fieldOfView in radians
     * @param {number} aspect
     * @param  {number=0.1} near
     * @param  {number=100} far
     * @returns Matrix4
     */
    public perspective(fieldOfView: number, aspect: number, near: number = 0.1, far: number = 100): Matrix4 {
        let fov = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfView);
        let rangeInv = 1.0 / (near - far);
        this.matrix[0] = fov / aspect;
        this.matrix[5] = fov;
        this.matrix[10] = (near + far) * rangeInv;
        this.matrix[11] = -1;
        this.matrix[14] = near * far * rangeInv * 2;
        return this;
    }
    /**
     * Rotates the matrix by the given radian over the x axis.
     * @param  {number} radian
     * @returns Matrix4
     */
    public rotateX(radian: number): Matrix4 {
        let sin = Math.sin(radian);
        let cos = Math.cos(radian);
        return this.multiply(new Matrix4().set(1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 0));
    }
    /**
     * Rotates the matrix by the given radian over the y axis.
     * @param  {number} radian
     * @returns Matrix4
     */
    public rotateY(radian: number): Matrix4 {
        let sin = Math.sin(radian);
        let cos = Math.cos(radian);
        return this.multiply(new Matrix4().set(cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 0));
    }
    /**
     * Rotates the matrix by the given radian over the z axis.
     * @param  {number} radian
     * @returns Matrix4
     */
    public rotateZ(radian: number): Matrix4 {
        let sin = Math.sin(radian);
        let cos = Math.cos(radian);
        return this.multiply(new Matrix4().set(cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0));
    }
    /**
     * Scales the matrix by x, y coords.
     * @param  {number} x
     * @param  {number} y
     * @returns Matrix
     */
    public scale(x: number, y: number, z: number): Matrix4 {
        this._matrix[0] = x * this._matrix[0];
        this._matrix[1] = x * this._matrix[1];
        this._matrix[2] = x * this._matrix[2];
        this._matrix[3] = x * this._matrix[3];
        this._matrix[4] = y * this._matrix[4];
        this._matrix[5] = y * this._matrix[5];
        this._matrix[6] = y * this._matrix[6];
        this._matrix[7] = y * this._matrix[7];
        this._matrix[8] = z * this._matrix[8];
        this._matrix[9] = z * this._matrix[9];
        this._matrix[10] = z * this._matrix[10];
        this._matrix[11] = z * this._matrix[11];
        return this;
    }
    /**
     * Translates the matrix by x, y coords.
     * @param  {number} x
     * @param  {number} y
     * @returns Matrix
     */
    public translate(x: number, y: number, z: number): Matrix4 {
        // tslint:disable-next-line: one-variable-per-declaration
        let a00 = this._matrix[0],
            a01 = this._matrix[1],
            a02 = this._matrix[2],
            a03 = this._matrix[3],
            a10 = this._matrix[4],
            a11 = this._matrix[5],
            a12 = this._matrix[6],
            a13 = this._matrix[7],
            a20 = this._matrix[8],
            a21 = this._matrix[9],
            a22 = this._matrix[10],
            a23 = this._matrix[11],
            a30 = this._matrix[12],
            a31 = this._matrix[13],
            a32 = this._matrix[14],
            a33 = this._matrix[15];
            this._matrix[12] = x * a00 + y * a10 + z * a20 + a30;
            this._matrix[13] = x * a01 + y * a11 + z * a21 + a31;
            this._matrix[14] = x * a02 + y * a12 + z * a22 + a32;
        return this;
    }
    /** Gets the dot product:
     * (a * b) + (c * d) + (e * f) + (g * h)
     * @param  {number} a
     * @param  {number} b
     * @param  {number} c
     * @param  {number} d
     * @param  {number} e
     * @param  {number} f
     * @param  {number} g
     * @param  {number} h
     * @returns number
     */
    private dotProduct(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number {
        return a * b + c * d + e * f + g * h;
    }
}