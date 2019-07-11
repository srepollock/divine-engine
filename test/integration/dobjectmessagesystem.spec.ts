import { DObject, Message, MessageSystem, MessageType } from "../../lib/divine.es";

describe("DObject and MessageSystem integration", () => {
    let messageSystem = new MessageSystem();
    let d1 = new DObject("first");
    let d2 = new DObject("second");
    // it("should send messages to the message stream", () => {
    //     d1.sendMessage();
    //     messageSystem.pipe(process.stdout);
    //     process.stdout.on("data", (data: Message) => {
    //         expect(data).to.not.equal(""); // uid must be the same
    //     });
    // });
    // it("should recieve messages of entity type from the message stream", () => {
    //     messageSystem.write(new Message("check d2 recieved", MessageType.Global, true));
    //     messageSystem.pipe(process.stdout);
    //     process.stdout.on("data", (data: Message) => {
    //         expect(data.toString()).to.not.equal(""); // uid must be the same
    //     });
    // });
});