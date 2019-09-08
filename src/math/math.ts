export interface Math {
    clamp(value: number, min: number, max: number): number;
    degreeToRadians(degrees: number): number;
    adianToDegree(radians: number): number;
}

(Math as any).clamp = (value: number, min: number, max: number): number => {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
};

(Math as any).degreeToRadians = (degrees: number): number => {
    return degrees * Math.PI / 180.0;
};

(Math as any).adianToDegree = (radians: number): number => {
    return radians * 180.0 / Math.PI;
};