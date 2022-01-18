const fs = require("fs");

module.exports = function base64wasm() {
    return {
        name: 'base64-wasm-bundler', // this name will show up in warnings and errors
        async transform(code, id) {
            if(id.endsWith(".wasm")) {
                const base64 = fs.readFileSync(id).toString("base64");
                return {
                    code: `export default "${base64}"`,
                    map: { mappings: "" },
                };
            }
            return null;
          },
    };
}