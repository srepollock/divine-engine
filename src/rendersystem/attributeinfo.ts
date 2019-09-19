export class AttributeInfo {
    public location: number;
    public size: number;
    public offset: number;
    /**
     * Class constructor.
     * @param  {number} location
     * @param  {number} size
     * @param  {number} offset?
     */
    constructor(location: number, size: number, offset?: number) {
        this.location = location;
        this.size = size;
        this.offset = (offset !== undefined) ? offset : 0;
    }
}