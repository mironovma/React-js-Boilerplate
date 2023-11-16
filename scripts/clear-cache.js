/* eslint-disable  */
const fs = require("fs");
const { join: joinPath } = require("path");
const chacheDir = joinPath(__dirname, "..", "node_modules/.cache");

fs.rmSync(chacheDir, { recursive: true, force: true });

console.log("Cache is cleared!");
