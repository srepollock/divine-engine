import "mocha";
// tslint:disable-next-line:max-line-length
import { DObject, EventType, log, LogLevel, Message, MessageSystem, Point, RenderComponent } from "../../lib/divine.es";
describe("Message System unit testing", () => {
    describe("Messages", () => {
        it("should be able to be created empty", () => {
            let message: Message = new Message("");
            // tslint:disable-next-line:max-line-length
            expect(JSON.stringify(message)).toBe(`{"_id":"${message._uid}","_data":"${message.data}"}`);
        });
        it("should take multiple strings of data as input", () => {
            let message: Message = new Message("1");
            // tslint:disable-next-line:max-line-length
            expect(JSON.stringify(message)).toBe(`{"_id":"${message._uid}","_data":"${message.data}"}`);
        });
        it("should save data as a string in JSON format", () => {
            let message: Message = new Message("1");
            expect(message).to.haveOwnProperty("_data");
        });
        it("should export as a JSON string", () => {
            let message: Message = new Message("1");
            // tslint:disable-next-line:max-line-length
            expect(message.toString).toBe(`{"_id":"${message._uid}","_data":"${message.data}"}`);
        });
        it("should export as a JSON object", () => {
            let message: Message = new Message("1");
            expect(message).toBeInstanceOf("Object");
        });
        it("should be able to get properties of Message", () => {
            let message: Message = new Message("100");
            expect(message.data).toBe("100");
        });
        it("should be able to get the properties of a RenderMessage", () => {
            let rc: RenderComponent = new RenderComponent("1");
            let message: Message = new Message(JSON.stringify(rc));
            expect((JSON.parse(message.data) as RenderComponent)).toEqual(rc);
        });
        it("should be able to get the properties of a PhysicsMessage", () => {
            let message: Message = new Message();
            expect(message._uid).toBe(`${message._uid}`);
        });
        it("should be able to get properties of Message", () => {
            let message: Message = new Message("{x: 11, y: 23}");
            expect((JSON.parse(message.data) as Point).x).toBe(11);
            expect((JSON.parse(message.data) as Point).y).toBe(23);
        });
    });
});
