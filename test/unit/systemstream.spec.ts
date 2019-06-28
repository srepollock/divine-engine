import { expect } from "chai";
import { Writable } from "stream";
import { EngineStream, Message, MessageType, SystemStream } from "../../src/index";

describe("System stream unit testing", () => {
    let systemStream: SystemStream = new SystemStream();
    beforeEach(() => {
        systemStream.removeAllListeners();
        systemStream = new SystemStream();
    });
    it("should change to JSON objects", () => {
        let m = new Message();
        expect(systemStream.toJSON(m)).to.be.a("string");
    });
    it("should change from JSON objects", () => {
        expect(systemStream.fromJSON(JSON.stringify(new Message()))).to.not.be.undefined;
    });
    it("should pass messages to the Writable", () => {
        let m: Message = new Message("Hello world!");
        let ws = new Writable({
            objectMode: true,
            write(chunk, encoding, callback){
                console.log(chunk.toString());
            }
        });
        systemStream.write(m);
        systemStream.pipe(ws); // printing here
        ws.on("data", (data) => {
            expect(data).to.equal(m); // uid must be the same
        });
    });
    it("should pass global messages to the Writable", () => {
        let m: Message = new Message("Hello world!", MessageType.Global, true);
        let es: EngineStream = new EngineStream();
        let ws = new Writable({
            objectMode: true,
            write(chunk, encoding, callback){
                console.log(chunk.toString());
            }
        });
        systemStream.write(m);
        systemStream.pipe(es).pipe(ws); // printing here
        es.on("data", (data) => {
            expect(systemStream.fromJSON(data)).to.not.be.undefined;
        });
        ws.on("data", (data) => {
            let d = systemStream.fromJSON(data);
            expect(d).to.not.be.undefined;
            if (d.type === MessageType.Removed) {
                expect(true);
            } else {
                expect(false).to.be.true; // Will throw an error
            }
        });
    });
});