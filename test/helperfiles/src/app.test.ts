import fs from "fs";
import * as Divine from "../../../lib/index";

function getEngineArugments(): Divine.EngineArguments {
    var engArgs: Divine.EngineArguments;
    var path = ""; // REVIEW: "./path/to/file/divine.opts"
    var contents = fs.readFileSync(path, "utf8");
    if (contents == null) {
        // NOTE: File empty
        engArgs = JSON.parse(JSON.stringify({
            debug: false,
            height: "800",
            width: "600"
        }));
    } else {
        engArgs = JSON.parse(contents) as Divine.EngineArguments;
    }
    return engArgs;
}
var engineArguments: Divine.EngineArguments = getEngineArugments();
Divine.Engine.start(engineArguments);