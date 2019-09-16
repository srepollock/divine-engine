/**
 * Creates a unique string ID and returns it.
 * @returns string
 */
export function guid(): string {
    /**
     * Inner function to get a random 4 character string.
     * @returns string
     */
    function s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }  
    return `${s4() + s4()}-${s4() + s4()}-${s4() + s4()}-${s4() + s4()}`;
}