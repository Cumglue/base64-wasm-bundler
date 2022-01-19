const fs = require("fs");

const decodeFunc = `
function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}`;

module.exports = function base64wasm() {
    return {
        name: 'base64-wasm-bundler', // this name will show up in warnings and errors
        async transform(code, id) {
            if (id.endsWith(".wasm")) {
                const base64 = fs.readFileSync(id).toString("base64");
                return {
                    code: `export default () => {
                        ${decodeFunc}
                        return _base64ToArrayBuffer("${base64}");
                    }`,
                    map: { mappings: "" },
                };
            }
            return null;
        }
    };
}