# rollup-base64-wasm-bundler

Easily bundle your .wasm files as a base64 string that can then be decoded to an Uint8Array.

## Usage

```js
import importWasm from "./pathToWasm/example.wasm"

const wasmbytes = importWasm();
```