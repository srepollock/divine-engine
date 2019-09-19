export interface Math {
    clamp(value: number, min: number, max: number): number;
    degreeToRadians(degrees: number): number;
    adianToDegree(radians: number): number;
}
/**
 * Adds a "clamp" method to the math class when this interface is loaded.
 * @param  {} Mathasany
 * @param  {number} value
 * @param  {number} min
 * @param  {number} max
 * @returns number
 */
(Math as any).clamp = (value: number, min: number, max: number): number => {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
};
/**
 * Adds a degree to raidians method to the math class.
 * @param  {} Mathasany
 * @param  {number} degrees
 * @returns number
 */
(Math as any).degreeToRadians = (degrees: number): number => {
    return degrees * Math.PI / 180.0;
};
/**
 * Adds a radian to degree method to the math class.
 * @param  {number} radians
 * @returns number
 */
(Math as any).radianToDegree = (radians: number): number => {
    return radians * 180.0 / Math.PI;
};