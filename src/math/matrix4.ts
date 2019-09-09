export class Matrix4 {
    private _matrix: Float32Array = new Float32Array(16);
    public get matrix(): Float32Array {
        return this._matrix;
    }
    constructor() {
        this._matrix = Matrix4.identity();
    }
    /**
     * Identity matrix (Basic)
     * |1 0 0 0|
     * |0 1 0 0|
     * |0 0 1 0|
     * |0 0 0 1|
     * @returns Float32Array
     */
    public static identity(): Float32Array {
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
        matrix[15] = 1;
        return matrix;
    }
    /**
     * Copies the matrix given to the matrix called on.
     * @param  {Matrix4} m
     * @returns Matrix
     */
    public static copy(m: Matrix4, m2: Matrix4): Matrix4 {
        let i = 0;
        m2.matrix.forEach((value) => {
            m._matrix[i++] = value;
        });
        return m;
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
    public static set(m: Matrix4, m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, 
        m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number,
        m32: number, m33: number): Matrix4 {
        m._matrix[0] = m00;
        m._matrix[1] = m01;
        m._matrix[2] = m02;
        m._matrix[3] = m03;
        m._matrix[4] = m10;
        m._matrix[5] = m11;
        m._matrix[6] = m12;
        m._matrix[7] = m13;
        m._matrix[8] = m20;
        m._matrix[9] = m21;
        m._matrix[10] = m22;
        m._matrix[11] = m23;
        m._matrix[12] = m30;
        m._matrix[13] = m31;
        m._matrix[14] = m32;
        m._matrix[15] = m33;
        return m;
    }
    /**
     * Adds the given matrix to the matrix called on.
     * @param  {Matrix4} m
     * @returns Matrix
     */
    public static add(m: Matrix4, m2: Matrix4): Matrix4 {
        let i: number = 0;
        m2.matrix.forEach((value) => {
            m.matrix[i++] += value;
        });
        return m;
    }
    /**
     * Subtracts the given matrix to the matrix called on.
     * @param  {Matrix4} m
     * @returns Matrix
     */
    public static subtract(m: Matrix4, m2: Matrix4): Matrix4 {
        let i: number = 0;
        m2.matrix.forEach((value) => {
            m.matrix[i++] -= value;
        });
        return m;
    }
    /**
     * Multiplies the matrix called on by the given.
     * @param  {Matrix4} m
     * @returns Matrix
     */
    public static multiply(a: Matrix4, b: Matrix4): Matrix4 {
        let m = new Matrix4();
        // tslint:disable-next-line: one-variable-per-declaration
        let a00 = a._matrix[0],
            a01 = a._matrix[1],
            a02 = a._matrix[2],
            a03 = a._matrix[3],
            a10 = a._matrix[4],
            a11 = a._matrix[5],
            a12 = a._matrix[6],
            a13 = a._matrix[7],
            a20 = a._matrix[8],
            a21 = a._matrix[9],
            a22 = a._matrix[10],
            a23 = a._matrix[11],
            a30 = a._matrix[12],
            a31 = a._matrix[13],
            a32 = a._matrix[14],
            a33 = a._matrix[15];
        // tslint:disable-next-line: one-variable-per-declaration
        let b00 = b._matrix[0],
            b01 = b._matrix[1],
            b02 = b._matrix[2],
            b03 = b._matrix[3],
            b10 = b._matrix[4],
            b11 = b._matrix[5],
            b12 = b._matrix[6],
            b13 = b._matrix[7],
            b20 = b._matrix[8],
            b21 = b._matrix[9],
            b22 = b._matrix[10],
            b23 = b._matrix[11],
            b30 = b._matrix[12],
            b31 = b._matrix[13],
            b32 = b._matrix[14],
            b33 = b._matrix[15];
        m._matrix[0] = Matrix4.dotProduct(a00, b00, a01, b01, a02, b20, a03, b30);
        m._matrix[1] = Matrix4.dotProduct(a00, b01, a01, b11, a02, b21, a03, b31);
        m._matrix[2] = Matrix4.dotProduct(a00, b02, a01, b12, a02, b22, a03, b32);
        m._matrix[3] = Matrix4.dotProduct(a00, b03, a01, b13, a02, b23, a03, b33);
        m._matrix[4] = Matrix4.dotProduct(a10, b00, a11, b10, a12, b20, a13, b30);
        m._matrix[5] = Matrix4.dotProduct(a10, b01, a11, b11, a12, b21, a13, b31);
        m._matrix[6] = Matrix4.dotProduct(a10, b02, a11, b12, a12, b22, a13, b32);
        m._matrix[7] = Matrix4.dotProduct(a10, b03, a11, b13, a12, b23, a13, b33);
        m._matrix[8] = Matrix4.dotProduct(a20, b00, a21, b10, a22, b20, a23, b30);
        m._matrix[9] = Matrix4.dotProduct(a20, b01, a21, b11, a22, b21, a23, b31);
        m._matrix[10] = Matrix4.dotProduct(a20, b02, a21, b12, a22, b22, a23, b32);
        m._matrix[11] = Matrix4.dotProduct(a20, b03, a21, b13, a22, b23, a23, b33);
        m._matrix[12] = Matrix4.dotProduct(a30, b00, a31, b10, a32, b20, a33, b30);
        m._matrix[13] = Matrix4.dotProduct(a30, b01, a31, b11, a32, b21, a33, b31);
        m._matrix[14] = Matrix4.dotProduct(a30, b02, a31, b12, a32, b22, a33, b32);
        m._matrix[15] = Matrix4.dotProduct(a30, b03, a31, b13, a32, b23, a33, b33);
        return m;
    }
    /**
     * Creates an orthographic projection matrix.
     * @param  {number} left
     * @param  {number} right
     * @param  {number} bottom
     * @param  {number} top
     * @param  {number} nearClip
     * @param  {number} farClip
     * @returns Matrix4
     */
    public static orthographic(left: number, right: number, bottom: number, top: number, nearClip: number, 
        farClip: number): Matrix4 {
        let matrix = new Matrix4();
        let lr: number = 1.0 / (left - right);
        let bt: number = 1.0 / (bottom - top);
        let nf: number = 1.0 / (nearClip - farClip);
        matrix._matrix[0] = -2.0 * lr;
        matrix._matrix[5] = -2.0 * bt;
        matrix._matrix[10] = 2.0 * nf;
        matrix._matrix[12] = (left + right) * lr;  
        matrix._matrix[13] = (top + bottom) * bt;  
        matrix._matrix[14] = (farClip + nearClip) * nf;  
        return matrix;
    }
    /**
     * Changes the called on matrix to a perspective matrix with the given values.
     * @param  {number} fieldOfView in radians
     * @param {number} aspect
     * @param  {number=0.1} near
     * @param  {number=100} far
     * @returns Matrix4
     */
    public static perspective(fieldOfView: number, aspect: number, near: number = 0.1, far: number = 100): Matrix4 {
        let m = new Matrix4();
        let fov = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfView);
        let rangeInv = 1.0 / (near - far);
        m.matrix[0] = fov / aspect;
        m.matrix[5] = fov;
        m.matrix[10] = (near + far) * rangeInv;
        m.matrix[11] = -1;
        m.matrix[14] = near * far * rangeInv * 2;
        return m;
    }
    /**
     * Rotates the matrix by the given radian over the x axis.
     * @param  {number} radian
     * @returns Matrix4
     */
    public static rotateX(m: Matrix4, radian: number): Matrix4 {
        let sin = Math.sin(radian);
        let cos = Math.cos(radian);
        return Matrix4.multiply(m, Matrix4.set(new Matrix4(),
            1, 0, 0, 0, 
            0, cos, -sin, 0, 
            0, sin, cos, 0, 
            0, 0, 0, 1));
    }
    /**
     * Rotates the matrix by the given radian over the y axis.
     * @param  {number} radian
     * @returns Matrix4
     */
    public static rotateY(m: Matrix4, radian: number): Matrix4 {
        let sin = Math.sin(radian);
        let cos = Math.cos(radian);
        return Matrix4.multiply(m, Matrix4.set(new Matrix4(),
            cos, 0, sin, 0, 
            0, 1, 0, 0, 
            -sin, 0, cos, 0, 
            0, 0, 0, 1));
    }
    /**
     * Rotates the matrix by the given radian over the z axis.
     * @param  {number} radian
     * @returns Matrix4
     */
    public static rotateZ(m: Matrix4, radian: number): Matrix4 {
        let sin = Math.sin(radian);
        let cos = Math.cos(radian);
        return Matrix4.multiply(m, Matrix4.set(new Matrix4(),
            cos, -sin, 0, 0, 
            sin, cos, 0, 0, 
            0, 0, 1, 0, 
            0, 0, 0, 1));
    }
    /**
     * Rotates the matrix over all axis by the radian given.
     * @param  {number} radian
     * @returns Matrix4
     */
    public static rotateXYZ(m: Matrix4, x: number, y: number, z: number): Matrix4 {
        let rx = Matrix4.rotateX(new Matrix4(), x);
        let ry = Matrix4.rotateY(new Matrix4(), y);
        let rz = Matrix4.rotateZ(new Matrix4(), z);
        // z * y * x
        return Matrix4.multiply(m, Matrix4.multiply(Matrix4.multiply(rz, ry), rx));
    }
    /**
     * Scales the matrix by x, y coords.
     * @param  {number} x
     * @param  {number} y
     * @returns Matrix
     */
    public static scale(m: Matrix4, x: number, y: number, z: number): Matrix4 {
        m.matrix[0] *= x;
        m.matrix[5] *= y;
        m.matrix[10] *= z;
        return m;
    }
    /**
     * Translates the matrix by x, y coords.
     * @param  {number} x
     * @param  {number} y
     * @returns Matrix
     */
    public static translate(m: Matrix4, x: number, y: number, z: number): Matrix4 {
        // tslint:disable-next-line: one-variable-per-declaration
        m.matrix[12] = x;
        m.matrix[13] = y;
        m.matrix[14] = z;
        return m;
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
    private static dotProduct(a: number, b: number, c: number, d: number, e: number, f: number, g: number, 
        h: number): number {
        return a * b + c * d + e * f + g * h;
    }
}