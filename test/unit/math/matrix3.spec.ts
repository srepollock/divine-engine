import { Matrix3 } from "../../../src";
describe("Matrix Unit Tests", () => {
    it("should give an identity matrix when called on", () => {
        expect(new Matrix3().matrix).toMatchObject(new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 0]));
    });
    it("should set the values of the matrix to [1,1,0,1,1,0,1,1,0]", () => {
        let m = new Matrix3();
        expect(m.set(1, 1, 0, 1, 1, 0, 1, 1, 0).matrix).toMatchObject(new Float32Array([1, 1, 0, 1, 1, 0, 1, 1, 0]));
    });
    it("should copy a given matrix to the called on matrix", () => {
        let m = new Matrix3().set(1, 1, 0, 1, 1, 0, 1, 1, 0);
        expect(new Matrix3().copy(m).matrix).toMatchObject(new Float32Array([1, 1, 0, 1, 1, 0, 1, 1, 0]));
    });
    it("should add the given matrix to the called on matrix", () => {
        expect(new Matrix3().add(new Matrix3().set(1, 1, 0, 1, 1, 0, 1, 1, 0)).matrix).toMatchObject(
            new Float32Array([2, 1, 0, 1, 2, 0, 1, 1, 0]));
    });
    it("should subtract the given matrix from the called on matrix", () => {
        expect(new Matrix3().subtract(new Matrix3()).matrix).toMatchObject(
            new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0]));
    });
    it("should scaled the called on matrix by the given matrix", () => {
        expect(new Matrix3().scalar(new Matrix3().set(2, 0, 0, 0, 2, 0, 0, 0, 0)).matrix).toMatchObject(
            new Float32Array([2, 0, 0, 0, 2, 0, 0, 0, 0]));
    });
    it("should invert the matrix", () => {
        expect(new Matrix3().set(1, 2, 0, 2, 1, 0, 0, 0, 1).invert().matrix).toMatchObject(
            new Float32Array([-(1 / 3), (2 / 3), -0, (2 / 3), -(1 / 3), -0, -0, -0, 1]));
    });
    it("should not invert a non-squre matrix", () => {
        expect(new Matrix3().set(1, 2, 0, 2, 1, 0, 0, 0, 0).invert().matrix).toMatchObject(
            new Float32Array([1, 2, 0, 2, 1, 0, 0, 0, 0]));
    });
    it("should multiply the called on matrix by the given matrix", () => {
        expect(new Matrix3().multiply(new Matrix3().set(2, 0, 0, 0, 2, 0, 0, 0, 0)).matrix).toMatchObject(
            new Float32Array([2, 0, 0, 0, 2, 0, 0, 0, 0]));
    });
    it("should rotate the matrix by the given radian", () => {
        expect(new Matrix3().rotate(Math.PI).matrix).toMatchObject(
            new Float32Array([-1, 1.2246468525851679e-16, 0, -1.2246468525851679e-16, -1, -1, 0, 0, 0]));
    });
    it("should scale the matrix by the given x, y", () => {
        expect(new Matrix3().scale(2, 2).matrix).toMatchObject(new Float32Array([2, 0, 0, 0, 2, 0, 0, 0, 0]));
    });
    it("should translate the matrix by the given x, y", () => {
        expect(new Matrix3().translate(10, 10).matrix).toMatchObject(new Float32Array([1, 0, 0, 0, 1, 0, 10, 10, 0]));
    });
});