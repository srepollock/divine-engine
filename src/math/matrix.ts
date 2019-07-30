export class Matrix {
    private _matrix: Float32Array = new Float32Array(9);
    public get matrix(): Float32Array {
        return this._matrix;
    }
    constructor() {
        this._matrix = this.identity();
    }
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
        matrix[8] = 1;
        return matrix;
    }
    public copy(m: Matrix): Matrix {
        let i = 0;
        m.matrix.forEach((value) => {
            this._matrix[i++] = value;
        });
        return this;
    }
    public set(m00: number, m01: number, m10: number, m11: number, m20: number, m21: number): Matrix {
        this._matrix[0] = m00;
        this._matrix[1] = m01;
        this._matrix[2] = 0;
        this._matrix[3] = m10;
        this._matrix[4] = m11;
        this._matrix[5] = 0;
        this._matrix[6] = m20;
        this._matrix[7] = m21;
        this._matrix[8] = 0;
        return this;
    }
    public add(m: Matrix): Matrix {
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
    public subtract(m: Matrix): Matrix {
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
    public scalar(m: Matrix): Matrix {
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
    public invert(): Matrix {

        return this;
    }
    public multiply(m: Matrix): Matrix {
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
        let b00 = this.matrix[0],
            b01 = this.matrix[1],
            b02 = this.matrix[2],
            b10 = this.matrix[3],
            b11 = this.matrix[4],
            b12 = this.matrix[5],
            b20 = this.matrix[6],
            b21 = this.matrix[7],
            b22 = this.matrix[8];
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
    public rotate(radian: number): Matrix {
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
    public scale(x: number, y: number): Matrix {
        this._matrix[0] = x * this._matrix[0];
        this._matrix[1] = x * this._matrix[1];
        this._matrix[2] = x * this._matrix[2];
        this._matrix[3] = y * this._matrix[3];
        this._matrix[4] = y * this._matrix[4];
        this._matrix[5] = y * this._matrix[5];
        return this;
    }
    public translate(x: number, y: number): Matrix {
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
    private dotProduct(a: number, b: number, c: number, d: number, e: number, f: number): number {
        return a * b + c * d + e * f;
    }
}