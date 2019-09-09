import { Matrix4, Vector3 } from "../../../src/math";
describe("Matrix4 Unit Tests", () => {
    it("should give an identity matrix when called on", () => {
        expect(new Matrix4().matrix).toMatchObject(new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
    });
    it("should set the values of the matrix to [1,1,0,1,1,0,1,1,0]", () => {
        let m = new Matrix4();
        expect(Matrix4.set(m, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1).matrix).toMatchObject(
            new Float32Array([1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1]));
    });
    it("should copy a given matrix to the called on matrix", () => {
        let m = Matrix4.set(new Matrix4(), 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1);
        expect(Matrix4.copy(new Matrix4(), m).matrix).toEqual(
            new Float32Array([1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1]));
    });
    it("should add the given matrix to the called on matrix", () => {
        expect(Matrix4.add(new Matrix4(), Matrix4.set(new Matrix4(),
            1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1)).matrix).toEqual(
                new Float32Array([2, 1, 1, 0, 1, 2, 1, 0, 1, 1, 2, 0, 0, 0, 0, 2]));
    });
    it("should subtract the given matrix from the called on matrix", () => {
        expect(Matrix4.subtract(new Matrix4(), new Matrix4()).matrix).toEqual(
            new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    });
    it("should scaled the called on matrix by the given matrix", () => {
        expect(Matrix4.scale(new Matrix4(), 2, 2, 2).matrix).toMatchObject(
                new Float32Array([2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1]));
    });
    it("should multiply the called on matrix by the given matrix", () => {
        expect(Matrix4.multiply(new Matrix4(), Matrix4.set(new Matrix4(),
            2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1)).matrix).toEqual(
                new Float32Array([2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1]));
    });
    it("should rotate the matrix about the X by the given radian (Pi or 45deg)", () => {
        expect(Matrix4.rotateX(new Matrix4(), Math.PI).matrix).toEqual(
            new Float32Array([1, 0, 0, 0, 0, -1, -1.2246468525851679e-16, 0, 0, 1.2246468525851679e-16, -1, 0, 0, 0, 0, 
                1]));
    });
    it("should rotate the matrix about the Y by the given radian (Pi or 45deg)", () => {
        expect(Matrix4.rotateY(new Matrix4(), Math.PI).matrix).toEqual(
            new Float32Array([-1, 0, 1.2246468525851679e-16, 0, 0, 1, 0, 0, -1.2246468525851679e-16, 0, -1, 0, 0, 0, 0, 
                1]));
    });
    it("should rotate the matrix about the Z by the given radian (Pi or 45deg)", () => {
        expect(Matrix4.rotateZ(new Matrix4(), Math.PI).matrix).toEqual(
            new Float32Array([-1, -1.2246468525851679e-16, 0, 0, 1.2246468525851679e-16, -1, 0, 0, 0, 0, 1, 0, 0, 0,
                0, 1]));
    });
    it("should scale the matrix by the given x, y, z", () => {
        expect(Matrix4.scale(new Matrix4(), 2, 2, 2).matrix).toEqual(
            new Float32Array([2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1]));
    });
    it("should translate the matrix by the given x, y, z", () => {
        expect(Matrix4.translate(new Matrix4(), 10, 10, 10).matrix).toEqual(
            new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 10, 10, 1]));
    });
    it("should rotate the matrix by the given x, y, z", () => {
        expect(Matrix4.rotateXYZ(new Matrix4(), 10, 10, 10).matrix).toEqual(
            new Float32Array([0.7040410041809082, -0.7048034071922302, -0.08705419301986694, 0, 0.45647263526916504, 
                0.5430330634117126, -0.7048034071922302, 0, 0.5440211296081543, 0.45647263526916504, 0.7040410041809082,
                0, 0, 0, 0, 1]));
    });
    it("should create a basic perspective matrix when given an identity matrix, 45deg FOV, 0.1 near, 100 far", () => {
        expect(Matrix4.perspective(45 * Math.PI / 180, 800 / 600).matrix).toEqual(
            new Float32Array([1.8106601238250732, 0, 0, 0, 0, 2.4142136573791504, 0, 0, 0, 0, -1.0020020008087158, -1, 
                0, 0, -0.20020020008087158, 1])
        );
    });
    it("should create an orthographic matrix when given an identity matrix, 45deg FOV, 0.1 near, 100 far", () => {
        expect(Matrix4.orthographic(0, 800, 0, 600, -100.0, 100.0).matrix).toEqual(
            new Float32Array([0.0024999999441206455, 0, 0, 0, 0, 0.0033333334140479565, 0, 0, 0, 0, 
                -0.009999999776482582, 0, -1, -1, -0, 1,])
        );
    });
    it("should create a basic perspective matrix when given an identity matrix, 45deg FOV, 0.1 near, 100 far", () => {
        expect(Matrix4.perspective(45 * Math.PI / 180, 800 / 600, 0.1, 100.0).matrix).toEqual(
            new Float32Array([1.8106601238250732, 0, 0, 0, 0, 2.4142136573791504, 0, 0, 0, 0, -1.0020020008087158, -1, 
                0, 0, -0.20020020008087158, 1])
        );
    });
});