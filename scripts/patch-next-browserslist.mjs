import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const targetDir = join(
  projectRoot,
  "node_modules/next/dist/compiled/browserslist",
);
const targetFile = join(targetDir, "index.js");
const backupFile = join(targetDir, "index.original.js");
const shim = `const path = require("path");

module.exports = require(
  require.resolve("browserslist", {
    paths: [path.join(__dirname, "../../../../..")],
  }),
);
`;

if (!existsSync(targetFile)) {
  process.exit(0);
}

const current = readFileSync(targetFile, "utf8");
if (current === shim) {
  process.exit(0);
}

if (!existsSync(backupFile) && current.length > 1000) {
  copyFileSync(targetFile, backupFile);
}

mkdirSync(targetDir, { recursive: true });
writeFileSync(targetFile, shim);
