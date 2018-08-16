const path = require("path");
const shelljs = require("shelljs");

const JS_OUTPUT_DIRECTORY = path.join(__dirname, "../dist/");

shelljs.rm("-rf", JS_OUTPUT_DIRECTORY);
shelljs.mkdir("-p", JS_OUTPUT_DIRECTORY);


