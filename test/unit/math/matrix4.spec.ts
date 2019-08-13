import { Matrix4 } from "../../../src/math";
describe("Matrix4 Unit Tests", () => {
    it("should give an identity matrix when called on", () => {
        expect(new Matrix4().matrix).toMatchObject(new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]));
    });
    it("should set the values of the matrix to [1,1,0,1,1,0,1,1,0]", () => {
        let m = new Matrix4();
        expect(m.set(1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0).matrix).toMatchObject(
            new Float32Array([1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0]));
    });
    it("should copy a given matrix to the called on matrix", () => {
        let m = new Matrix4().set(1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0);
        expect(new Matrix4().copy(m).matrix).toMatchObject(
            new Float32Array([1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0]));
    });
    it("should add the given matrix to the called on matrix", () => {
        expect(new Matrix4().add(new Matrix4().set(
            1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0)).matrix).toMatchObject(
                new Float32Array([2, 1, 1, 0, 1, 2, 1, 0, 1, 1, 2, 0, 0, 0, 0, 0]));
    });
    it("should subtract the given matrix from the called on matrix", () => {
        expect(new Matrix4().subtract(new Matrix4()).matrix).toMatchObject(
            new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    });
    it("should scaled the called on matrix by the given matrix", () => {
        expect(new Matrix4().scalar(new Matrix4().set(
            2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0)).matrix).toMatchObject(
                new Float32Array([2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0]));
    });
    it("should invert the matrix", () => {
        expect(new Matrix4().set(2, 1, 1, 0, 1, 2, 1, 0, 1, 1, 2, 0, 0, 0, 0, 1).invert().matrix).toEqual(
            new Float32Array([(3 / 4), -(1 / 4), -(1 / 4), 0, -(1 / 4), (3 / 4), -(1 / 4), 0, -(1 / 4), -(1 / 4), 
                (3 / 4), 0, 0, 0, 0, 1]));
    });
    it("should not invert a non-square matrix", () => {
        expect(new Matrix4().set(2, 1, 1, 0, 1, 2, 1, 0, 1, 1, 2, 0, 0, 0, 0, 0).invert().matrix).toEqual(
            new Float32Array([2, 1, 1, 0, 1, 2, 1, 0, 1, 1, 2, 0, 0, 0, 0, 0]));
    });
    it("should multiply the called on matrix by the given matrix", () => {
        expect(new Matrix4().multiply(new Matrix4().set(
            2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0)).matrix).toMatchObject(
                new Float32Array([2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0]));
    });
    it("should rotate the matrix about the X by the given radian (Pi or 45deg)", () => {
        expect(new Matrix4().rotateX(Math.PI).matrix).toMatchObject(
            new Float32Array([1, 0, 0, 0, 0, -1, -1.2246468525851679e-16, 0, 0, 1.2246468525851679e-16, -1, 0, 0, 0, 0, 
                0]));
    });
    it("should rotate the matrix about the Y by the given radian (Pi or 45deg)", () => {
        expect(new Matrix4().rotateY(Math.PI).matrix).toMatchObject(
            new Float32Array([-1, 0, 1.2246468525851679e-16, 0, 0, 1, 0, 0, -1.2246468525851679e-16, 0, -1, 0, 0, 0, 0, 
                0]));
    });
    it("should rotate the matrix about the Z by the given radian (Pi or 45deg)", () => {
        expect(new Matrix4().rotateZ(Math.PI).matrix).toMatchObject(
            new Float32Array([-1, -1.2246468525851679e-16, 0, 0, 1.2246468525851679e-16, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                0]));
    });
    it("should scale the matrix by the given x, y, z", () => {
        expect(new Matrix4().scale(2, 2, 2).matrix).toMatchObject(
            new Float32Array([2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0]));
    });
    it("should translate the matrix by the given x, y, z", () => {
        expect(new Matrix4().translate(10, 10, 10).matrix).toMatchObject(
            new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 10, 10, 0]));
    });
    it("should create a basic perspective matrix when given an identity matrix, 45deg FOV, 0.1 near, 100 far", () => {
        expect(new Matrix4().perspective(45 * Math.PI / 180, 800 / 600, 0.1, 100.0).matrix).toMatchObject(
            new Float32Array([1.8106601238250732, 0, 0, 0, 0, 2.4142136573791504, 0, 0, 0, 0, -1.0020020008087158, -1, 
                0, 0, -0.20020020008087158, 0])
        );
    });
});