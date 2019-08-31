export class Matrix3 {
    private _matrix: Float32Array = new Float32Array(9);
    public get matrix(): Float32Array {
        return this._matrix;
    }
    constructor() {
        this._matrix = this.identity();
    }
    /**
     * Identity matrix (Basic)
     * |1 0 0|
     * |0 1 0|
     * |0 0 1|
     * @returns Float32Array
     */
    public identity(): Float32Array {
        let matrix = new Float32Array(9);
        matrix[0] = 1;
        matrix[1] = 0;
        matrix[2] = 0;
        matrix[3] = 0;
        matrix[4] = 1;
        matrix[5] = 0;
        matrix[6] = 0;
        matrix[7] = 0;
        matrix[8] = 0;
        return matrix;
    }
    /**
     * Copies the matrix given to the matrix called on.
     * @param  {Matrix3} m
     * @returns Matrix3
     */
    public copy(m: Matrix3): Matrix3 {
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
     * @param  {number} m10
     * @param  {number} m11
     * @param  {number} m12
     * @param  {number} m20
     * @param  {number} m21
     * @param  {number} m22
     * @returns Matrix3
     */
    public set(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, 
        m22: number): Matrix3 {
        this._matrix[0] = m00;
        this._matrix[1] = m01;
        this._matrix[2] = m02;
        this._matrix[3] = m10;
        this._matrix[4] = m11;
        this._matrix[5] = m12;
        this._matrix[6] = m20;
        this._matrix[7] = m21;
        this._matrix[8] = m22;
        return this;
    }
    /**
     * Adds the given matrix to the matrix called on.
     * @param  {Matrix3} m
     * @returns Matrix
     */
    public add(m: Matrix3): Matrix3 {
        this._matrix[0] += m.matrix[0];
        this._matrix[1] += m.matrix[1];
        this._matrix[2] += m.matrix[2];
        this._matrix[3] += m.matrix[3];
        this._matrix[4] += m.matrix[4];
        this._matrix[5] += m.matrix[5];
        this._matrix[6] += m.matrix[6];
        this._matrix[7] += m.matrix[7];
        this._matrix[8] += m.matrix[8];
        return this;
    }
    /**
     * Subtracts the given matrix to the matrix called on.
     * @param  {Matrix3} m
     * @returns Matrix
     */
    public subtract(m: Matrix3): Matrix3 {
        this._matrix[0] -= m.matrix[0];
        this._matrix[1] -= m.matrix[1];
        this._matrix[2] -= m.matrix[2];
        this._matrix[3] -= m.matrix[3];
        this._matrix[4] -= m.matrix[4];
        this._matrix[5] -= m.matrix[5];
        this._matrix[6] -= m.matrix[6];
        this._matrix[7] -= m.matrix[7];
        this._matrix[8] -= m.matrix[8];
        return this;
    }
    /**
     * Scales the called on matrix by the given matrix.
     * @param  {Matrix3} m
     * @returns Matrix
     */
    public scalar(m: Matrix3): Matrix3 {
        this._matrix[0] *= m.matrix[0];
        this._matrix[1] *= m.matrix[1];
        this._matrix[2] *= m.matrix[2];
        this._matrix[3] *= m.matrix[3];
        this._matrix[4] *= m.matrix[4];
        this._matrix[5] *= m.matrix[5];
        this._matrix[6] *= m.matrix[6];
        this._matrix[7] *= m.matrix[7];
        this._matrix[8] *= m.matrix[8];
        return this;
    }
    /**
     * Inverts the matrix called on.
     * @returns Matrix
     */
    public invert(): Matrix3 {
        // tslint:disable-next-line: one-variable-per-declaration
        let a00 = this.matrix[0],
            a01 = this.matrix[1],
            a02 = this.matrix[2],
            a10 = this.matrix[3],
            a11 = this.matrix[4],
            a12 = this.matrix[5],
            a20 = this.matrix[6],
            a21 = this.matrix[7],
            a22 = this.matrix[8];
        // tslint:disable-next-line: one-variable-per-declaration
        let b01 = a22 * a11 - a12 * a21,
            b11 = -a22 * a10 + a12 * a20,
            b21 = a21 * a10 - a11 * a20;
        let det = a00 * b01 + a01 * b11 + a02 * b21;
        if (!det) {
            return this;
        }
        det = 1.0 / det;
        this._matrix[0] = b01 * det;
        this._matrix[1] = (-a22 * a01 + a02 * a21) * det;
        this._matrix[2] = (a12 * a01 - a02 * a11) * det;
        this._matrix[3] = b11 * det;
        this._matrix[4] = (a22 * a00 - a02 * a20) * det;
        this._matrix[5] = (-a12 * a00 + a02 * a10) * det;
        this._matrix[6] = b21 * det;
        this._matrix[7] = (-a21 * a00 + a01 * a20) * det;
        this._matrix[8] = (a11 * a00 - a01 * a10) * det;
        return this;
    }
    /**
     * Multiplies the matrix called on by the given.
     * @param  {Matrix3} m
     * @returns Matrix
     */
    public multiply(m: Matrix3): Matrix3 {
        // tslint:disable-next-line: one-variable-per-declaration
        let a00 = this.matrix[0],
            a01 = this.matrix[1],
            a02 = this.matrix[2],
            a10 = this.matrix[3],
            a11 = this.matrix[4],
            a12 = this.matrix[5],
            a20 = this.matrix[6],
            a21 = this.matrix[7],
            a22 = this.matrix[8];
        // tslint:disable-next-line: one-variable-per-declaration
        let b00 = m.matrix[0],
            b01 = m.matrix[1],
            b02 = m.matrix[2],
            b10 = m.matrix[3],
            b11 = m.matrix[4],
            b12 = m.matrix[5],
            b20 = m.matrix[6],
            b21 = m.matrix[7],
            b22 = m.matrix[8];
        this._matrix[0] = this.dotProduct(b00, a00, b01, a10, b02, a20);
        this._matrix[1] = this.dotProduct(b00, a01, b01, a11, b02, a21);
        this._matrix[2] = this.dotProduct(b00, a02, b01, a12, b02, a22);
        this._matrix[3] = this.dotProduct(b10, a00, b11, a10, b12, a20);
        this._matrix[4] = this.dotProduct(b10, a01, b11, a11, b12, a21);
        this._matrix[5] = this.dotProduct(b10, a02, b11, a12, b12, a22);
        this._matrix[6] = this.dotProduct(b20, a00, b21, a10, b22, a20);
        this._matrix[7] = this.dotProduct(b20, a01, b21, a11, b22, a21);
        this._matrix[8] = this.dotProduct(b20, a02, b21, a12, b22, a22);
        return this;
    }
    /**
     * Rotates the matrix by the given radian.
     * @param  {number} radian
     * @returns Matrix
     */
    public rotate(radian: number): Matrix3 {
        // tslint:disable-next-line: one-variable-per-declaration
        let a00 = this.matrix[0],
            a01 = this.matrix[1],
            a02 = this.matrix[2],
            a10 = this.matrix[3],
            a11 = this.matrix[4],
            a12 = this.matrix[5];
        let sin = Math.sin(radian);
        let cos = Math.cos(radian);
        this._matrix[0] = cos * a00 + sin * a10;
        this._matrix[1] = cos * a01 + sin * a11;
        this._matrix[2] = cos * a02 + sin * a12;
        this._matrix[3] = cos * a10 - sin * a00;
        this._matrix[4] = cos * a11 - sin * a01;
        this._matrix[5] = cos * a11 - sin * a02;
        return this;
    }
    /**
     * Scales the matrix by x, y coords.
     * @param  {number} x
     * @param  {number} y
     * @returns Matrix
     */
    public scale(x: number, y: number): Matrix3 {
        this._matrix[0] = x * this._matrix[0];
        this._matrix[1] = x * this._matrix[1];
        this._matrix[2] = x * this._matrix[2];
        this._matrix[3] = y * this._matrix[3];
        this._matrix[4] = y * this._matrix[4];
        this._matrix[5] = y * this._matrix[5];
        return this;
    }
    /**
     * Translates the matrix by x, y coords.
     * @param  {number} x
     * @param  {number} y
     * @returns Matrix
     */
    public translate(x: number, y: number): Matrix3 {
        // tslint:disable-next-line: one-variable-per-declaration
        let a00 = this.matrix[0],
            a01 = this.matrix[1],
            a02 = this.matrix[2],
            a10 = this.matrix[3],
            a11 = this.matrix[4],
            a12 = this.matrix[5],
            a20 = this.matrix[6],
            a21 = this.matrix[7],
            a22 = this.matrix[8];
        this._matrix[6] = x * a00 + y * a10 + a20;
        this._matrix[7] = x * a01 + y * a11 + a21;
        this._matrix[8] = x * a02 + y * a12 + a22;
        return this;
    }
    /** Gets the dot product:
     * (a * b) + (c * d) + (e * f)
     * @param  {number} a
     * @param  {number} b
     * @param  {number} c
     * @param  {number} d
     * @param  {number} e
     * @param  {number} f
     * @returns number
     */
    private dotProduct(a: number, b: number, c: number, d: number, e: number, f: number): number {
        return a * b + c * d + e * f;
    }
}