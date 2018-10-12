import Entity from "./entity";
exprt; class Scene {
    // NOTE: tslint:disable-next-line:semicolon
    private _entityArray: Array<Entity> = new Array<Entity>();
    private _title: string = "";
    public get entityArray(): Array<Entity> {
        return this._entityArray;
    }
    public set entityArray(newList: Array<Entity>) {
        this._entityArray = newList;
    }
    public get title(): string {
        return this._title;
    }
    constructor(entities?: Array<Entity>) {
        if (entities !== undefined) {
            this._entityArray = entities;
        }
    }
    // NOTE: These are to be managed by the SceneManager only however. 
    // NOTE: How do I do this?
    public start(): void {

    }
    public restart(): void {
        
    }
    public stop(): void {

    }
    public shutdown(): void {
        this.cleanup();
    }
    public addEntity(e: Entity): void {
        this._entityArray.push(e);
    }
    public addEntities(eList: Array<Entity>): void {
        // TODO: Implement this
    }
    /**
     * Unloads the current scene, and provides any other clenaup steps necessary.
     * @returns void
     */
    private cleanup(): void {
        // TODO: Do entities need to be passed here?
        // NOTE: If things need to be loaded to the next scene, should I send it through the message system?
    }
}

